import { Avatar, Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { user: true, text: input }]);
      setMessages((prev) => [...prev, { user: false, text: "AI response..." }]); // Replace with AI response
      setInput("");
    }
  };

  return (
    <Box className="h-screen flex flex-col">
      {/* Ticker and Logo */}
      <HStack className="bg-gray-200 flex items-center justify-between px-4 py-2">
        <Text fontSize="lg" fontWeight="bold">
          NEPSE-Navigator
        </Text>
        <Box className="flex space-x-4 overflow-auto">
          {/* ticker space */}
        </Box>
        <Avatar
          size="md"
          bg="blue.500"
          color="white"
          cursor="pointer"
          onClick={() => navigate("/profile")}
          onMouseEnter={() => console.log("Hover to show profile dropdown")}
        />
      </HStack>

      {/* Main Content */}
      <HStack className="flex-grow">
        {/* Left Section */}
        <Box className="w-1/4 bg-gray-100 p-4">
          <Button
            onClick={() => navigate("/premium")}
            className="block w-full"
            bg="blue.500"
            color="white"
            py="2"
            borderRadius="md"
            _hover={{ bg: "blue.600" }}
          >
            Premium Plan
          </Button>
        </Box>

        {/* Chat Section */}
        <Box className="flex-grow flex flex-col bg-gray-200">
          <VStack
            className="flex-grow p-4 overflow-auto"
            align="stretch"
            spacing="4"
          >
            {messages.map((msg, idx) =>
              msg.user ? (
                <Box
                  key={idx}
                  className="mb-2 p-2 rounded"
                  bg="blue.500"
                  color="white"
                  alignSelf="end"
                  borderRadius="md"
                >
                  {msg.text}
                </Box>
              ) : (
                <Box
                  key={idx}
                  className="mb-2 p-2 rounded"
                  bg="gray.300"
                  color="black"
                  alignSelf="start"
                  borderRadius="md"
                >
                  {msg.text}
                </Box>
              )
            )}
          </VStack>
          <HStack className="p-4">
            <Input
              className="flex-grow"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              p="2"
              mr="2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your message..."
            />
            <Button
              onClick={handleSend}
              bg="blue.500"
              color="white"
              px="4"
              py="2"
              borderRadius="md"
              _hover={{ bg: "blue.600" }}
            >
              Send
            </Button>
          </HStack>
        </Box>

        {/* History Section */}
        <Box className="w-1/4 bg-blue-800 text-white p-4">
          <Text fontSize="lg" fontWeight="bold">
            History
          </Text>
          <VStack align="stretch" mt="2" spacing="2">
            {messages
              .filter((msg) => msg.user)
              .map((msg, idx) => (
                <Box key={idx} className="text-white">
                  {msg.text}
                </Box>
              ))}
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default Home;
