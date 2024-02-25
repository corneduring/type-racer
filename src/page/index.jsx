import {
  Card,
  Divider,
  Flex,
  Text,
  CardHeader,
  Input,
  HStack,
  Button,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useTime } from "../utils/useTime";
import { useValidateInput } from "../utils/useValidateInput";
import { useHighlightText } from "../utils/useHighlightText";
import DOMPurify from "dompurify";
let num = 0;
const Index = () => {
  num++;
  console.log("Rerendered num: ", num);
  const textExtract =
    "Your faith was strong but you needed proof. You saw her bathing on the roof. Her beauty in the moonlight overthrew you. She tied you to a kitchen chair, she broke your throne she cut your hair and from your lips she drew the hallelujah.";
  let accuracy = useRef(0);
  let firstMistakeIndex = useRef(textExtract.length);
  let inputRef = useRef();
  let isSuccessfulAttempt = useRef(true);
  const [markup, setMarkup] = useState(textExtract);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  let totalMistakes = useRef(0);

  const {
    displayTimeElapsed,
    inputDisabled,
    resetStopwatch,
    startStopwatch,
    stopStopwatch,
    timeElapsed,
  } = useTime(
    accuracy,
    firstMistakeIndex,
    inputRef,
    isSuccessfulAttempt,
    setMarkup,
    setWordsPerMinute,
    textExtract,
    totalMistakes
  );
  const { validateInput } = useValidateInput(
    accuracy,
    firstMistakeIndex,
    isSuccessfulAttempt,
    setWordsPerMinute,
    stopStopwatch,
    textExtract,
    timeElapsed,
    totalMistakes
  );
  const { highlightTextExtract } = useHighlightText(
    firstMistakeIndex,
    isSuccessfulAttempt,
    setMarkup,
    textExtract
  );

  const handleInputChange = (key) => {
    startStopwatch();
    validateInput(key.target.value);
    highlightTextExtract(key.target.value);
  };

  return (
    <Flex justifyContent={"center"} p={3}>
      <Card gap={3} w="100%" p={4} maxW={"600px"} backgroundColor={"#fafafa"}>
        <CardHeader p={0} display={"flex"} flexDirection={"column"} gap={4}>
          <Heading as={"h1"} size={"md"} textAlign={"center"}>
            Type Racer
          </Heading>
          <Flex justifyContent={"space-between"} gap={2}>
            <VStack gap={0} flex={1} alignItems={"flex-start"}>
              <Text fontSize={"sm"}>Time:</Text>
              <Text fontSize={"lg"} fontWeight={"600"} w={"max-content"}>
                {displayTimeElapsed(timeElapsed)}
              </Text>
            </VStack>
            <VStack gap={0} flex={1} alignItems={"center"}>
              <Text fontSize={"sm"}>Accuracy:</Text>
              <Text fontSize={"lg"} fontWeight={"600"} w={"max-content"}>
                {`${accuracy.current ?? 0}%`}
              </Text>
            </VStack>
            <VStack gap={0} flex={1} alignItems={"flex-end"}>
              <Text fontSize={"sm"}>Speed:</Text>
              <Text fontSize={"lg"} fontWeight={"600"} w={"max-content"}>
                {`${wordsPerMinute} wpm`}
              </Text>
            </VStack>
          </Flex>
        </CardHeader>
        <Divider orientation="horizontal" />
        <Card p={2}>
          <Text
            letterSpacing={"2px"}
            userSelect={"none"}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(markup) }}
          />
        </Card>
        <Input
          ref={inputRef}
          placeholder="Start typing to start your attempt..."
          onInput={handleInputChange}
          onCopy={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          isDisabled={inputDisabled}
        />
        <HStack>
          <Button flex={1} onClick={() => stopStopwatch()}>
            Stop
          </Button>
          <Button flex={1} onClick={() => resetStopwatch()}>
            Reset
          </Button>
        </HStack>
      </Card>
    </Flex>
  );
};

export default Index;
