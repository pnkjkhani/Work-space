import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Text, Flex, Box } from '@radix-ui/themes';

const Steps = () => {
  return (
    <Tabs defaultValue="basic_info" className="mt-6">
          <TabsList className="flex justify-between bg-gray-800 p-4 rounded-lg">
            {/* Step 1 */}
            <TabsTrigger
              value="basic_info"
              className="flex flex-col items-center p-2 text-center text-white"
            >
              <Flex className="items-center space-x-2">
                <Box className="w-6 h-6 flex items-center justify-center bg-green-400 rounded-full font-bold">
                  1
                </Box>
                <Text>Basic Info</Text>
              </Flex>
              <Text className="text-sm text-gray-400 mt-1">
                Rhoncus morbi et augue nec, in id ullamcorper at sit.
              </Text>
            </TabsTrigger>

            {/* Step 2 */}
            <TabsTrigger
              value="scope"
              className="flex flex-col items-center p-2 text-center text-white"
            >
              <Flex className="items-center space-x-2">
                <Box className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full font-bold">
                  2
                </Box>
                <Text>Scope</Text>
              </Flex>
              <Text className="text-sm text-gray-400 mt-1">
                Rhoncus morbi et augue nec, in id ullamcorper at sit.
              </Text>
            </TabsTrigger>

            {/* Step 3 */}
            <TabsTrigger
              value="placement"
              className="flex flex-col items-center p-2 text-center text-white"
            >
              <Flex className="items-center space-x-2">
                <Box className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full font-bold">
                  3
                </Box>
                <Text>Placement</Text>
              </Flex>
              <Text className="text-sm text-gray-400 mt-1">
                Rhoncus morbi et augue nec, in id ullamcorper at sit.
              </Text>
            </TabsTrigger>

            {/* Step 4 */}
            <TabsTrigger
              value="triggers"
              className="flex flex-col items-center p-2 text-center text-white"
            >
              <Flex className="items-center space-x-2">
                <Box className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full font-bold">
                  4
                </Box>
                <Text>Triggers</Text>
              </Flex>
              <Text className="text-sm text-gray-400 mt-1">
                Rhoncus morbi et augue nec, in id ullamcorper at sit.
              </Text>
            </TabsTrigger>

            {/* Step 5 */}
            <TabsTrigger
              value="questions"
              className="flex flex-col items-center p-2 text-center text-white"
            >
              <Flex className="items-center space-x-2">
                <Box className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full font-bold">
                  5
                </Box>
                <Text>Questions</Text>
              </Flex>
              <Text className="text-sm text-gray-400 mt-1">
                Rhoncus morbi et augue nec, in id ullamcorper at sit.
              </Text>
            </TabsTrigger>
          </TabsList>
        </Tabs>
  )
}

export default Steps
