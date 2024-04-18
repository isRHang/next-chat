import { type NextRequest, NextResponse } from 'next/server'

import { v4 as uuidv4 } from 'uuid'

import { auth } from '@clerk/nextjs'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return

    const chatAgents = await prisma.chatAgent.findMany({
      where: {
        userId,
      },
      include: {
        messages: true,
      },
    })

    if (chatAgents.length === 0) {
      return NextResponse.json(
        { error: 'No ChatAgent found!' },
        {
          status: 404,
        },
      )
    }

    return NextResponse.json(chatAgents, {
      status: 200,
    })
  } catch (error) {
    console.error('Failed to fetch ChatAgents: ', error)

    return NextResponse.json(
      { error: 'Internal Server Error!' },
      {
        status: 500,
      },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) return

    const defaultChatAgent = await prisma.$transaction(async (prisma) => {
      const newChatAgent = await prisma.chatAgent.create({
        data: {
          id: uuidv4(),
          identifier: 'default-agent',
          avatar: 'exploding-head',
          title: 'Just Chat',
          description:
            'Activate the brain cluster and spark creative thinking. Your virtual agent is here to communicate with you about everything.',
          tags: [],
          systemRole: 'You are a helpful assistant.',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId,
        },
      })

      const newMessage = await prisma.message.create({
        data: {
          id: uuidv4(),
          role: 'system',
          content: newChatAgent.systemRole,
          createdAt: new Date(),
          chatAgentId: newChatAgent.id,
        },
      })

      return await prisma.chatAgent.findFirst({
        where: { id: newChatAgent.id },
        include: { messages: true },
      })
    })

    return NextResponse.json(defaultChatAgent, {
      status: 200,
    })
  } catch (error) {
    console.error('Failed to create Default ChatAgent: ', error)

    return NextResponse.json(
      { error: 'Internal Server Error!' },
      {
        status: 500,
      },
    )
  }
}
