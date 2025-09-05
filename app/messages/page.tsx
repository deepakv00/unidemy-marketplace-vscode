"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useApp } from "@/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Search, User, Phone, MoreVertical, ImageIcon } from "lucide-react"

const MessagesPage = () => {
  const { state } = useApp()
  const searchParams = useSearchParams()
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Check for URL parameters to auto-start a conversation
  useEffect(() => {
    const seller = searchParams.get("seller")
    const productId = searchParams.get("product")

    if (seller && productId) {
      // Auto-select or create conversation with this seller about this product
      const existingConv = conversations.find((c) => c.name === seller)
      if (existingConv) {
        setSelectedConversation(existingConv.id)
      } else {
        // Create new conversation
        setSelectedConversation("new")
        setNewMessage(`Hi! I'm interested in your product (ID: ${productId}). Is it still available?`)
      }
    }
  }, [searchParams])

  const conversations = [
    {
      id: "1",
      name: "John Smith",
      avatar: "/abstract-geometric-shapes.png",
      lastMessage: "Is this item still available?",
      timestamp: "2 hours ago",
      unread: 2,
      product: "iPhone 15 Pro Max - Like New",
      productId: 1,
      online: true,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "/diverse-woman-portrait.png",
      lastMessage: "Thanks for the quick response!",
      timestamp: "1 day ago",
      unread: 0,
      product: "2019 Honda Civic - Excellent Condition",
      productId: 2,
      online: false,
    },
    {
      id: "3",
      name: "Mike Wilson",
      avatar: "/thoughtful-man.png",
      lastMessage: "Can we meet tomorrow?",
      timestamp: "3 days ago",
      unread: 1,
      product: "Modern Sofa Set - 3 Piece",
      productId: 3,
      online: true,
    },
    {
      id: "4",
      name: "Emily Chen",
      avatar: "/abstract-geometric-shapes.png",
      lastMessage: "Perfect! I'll take it.",
      timestamp: "5 days ago",
      unread: 0,
      product: 'MacBook Pro 16" M3 - Barely Used',
      productId: 4,
      online: false,
    },
  ]

  const getMessagesForConversation = (convId: string) => {
    const messageData: Record<string, any[]> = {
      "1": [
        {
          id: "1",
          sender: "John Smith",
          content: "Hi! Is this iPhone still available?",
          timestamp: "10:30 AM",
          isOwn: false,
        },
        {
          id: "2",
          sender: "You",
          content: "Yes, it's still available. Would you like to see it?",
          timestamp: "10:35 AM",
          isOwn: true,
        },
        {
          id: "3",
          sender: "John Smith",
          content: "Great! Can we meet today? I'm very interested.",
          timestamp: "2:15 PM",
          isOwn: false,
        },
        {
          id: "4",
          sender: "You",
          content: "How about 4 PM at the coffee shop on Main Street?",
          timestamp: "2:20 PM",
          isOwn: true,
        },
        {
          id: "5",
          sender: "John Smith",
          content: "Perfect! See you there. Should I bring cash?",
          timestamp: "2:25 PM",
          isOwn: false,
        },
      ],
      "2": [
        {
          id: "1",
          sender: "Sarah Johnson",
          content: "Hi! I saw your Honda Civic listing. Is it still available?",
          timestamp: "Yesterday 9:00 AM",
          isOwn: false,
        },
        {
          id: "2",
          sender: "You",
          content: "Yes it is! Would you like to schedule a test drive?",
          timestamp: "Yesterday 9:15 AM",
          isOwn: true,
        },
        {
          id: "3",
          sender: "Sarah Johnson",
          content: "Thanks for the quick response!",
          timestamp: "Yesterday 9:20 AM",
          isOwn: false,
        },
      ],
      "3": [
        {
          id: "1",
          sender: "Mike Wilson",
          content: "Interested in the sofa set. What's the condition?",
          timestamp: "3 days ago",
          isOwn: false,
        },
        {
          id: "2",
          sender: "You",
          content: "It's in excellent condition, barely used. No pets, no smoking household.",
          timestamp: "3 days ago",
          isOwn: true,
        },
        {
          id: "3",
          sender: "Mike Wilson",
          content: "Can we meet tomorrow?",
          timestamp: "3 days ago",
          isOwn: false,
        },
      ],
    }
    return messageData[convId] || []
  }

  const messages = selectedConversation ? getMessagesForConversation(selectedConversation) : []

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("[v0] Sending message:", newMessage)
      // In a real app, this would send the message to the backend
      setNewMessage("")
    }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.product.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedConv = conversations.find((c) => c.id === selectedConversation)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
          {state.isAuthenticated && (
            <Badge variant="secondary" className="ml-2">
              {conversations.filter((c) => c.unread > 0).length} unread
            </Badge>
          )}
        </div>

        {!state.isAuthenticated ? (
          <Card>
            <CardContent className="flex items-center justify-center py-16">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Sign in to view messages</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  You need to be signed in to access your messages
                </p>
                <Button onClick={() => (window.location.href = "/auth/login")}>Sign In</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Conversations</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[500px] overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-b transition-colors ${
                        selectedConversation === conversation.id ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate text-gray-900 dark:text-white">{conversation.name}</p>
                            {conversation.unread > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {conversation.lastMessage}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {conversation.product} • {conversation.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-2">
              {selectedConversation && selectedConv ? (
                <>
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={selectedConv.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          {selectedConv.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg text-gray-900 dark:text-white">{selectedConv.name}</CardTitle>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {selectedConv.online ? "Online" : "Last seen " + selectedConv.timestamp} • About:{" "}
                            {selectedConv.product}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col h-[500px]">
                    <div className="flex-1 overflow-y-auto space-y-4 py-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.isOwn
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.isOwn ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-4 border-t">
                      <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button
                        onClick={handleSendMessage}
                        size="icon"
                        disabled={!newMessage.trim()}
                        className="shrink-0"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Select a conversation</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessagesPage
