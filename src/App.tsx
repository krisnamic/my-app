import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  HStack,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import './App.css';
import { motion } from 'framer-motion';

var quoteText;
var authorText;

export const App = () => {
  const [quote, setQuote] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [clicker, setClicker] = React.useState(true);

React.useEffect(() => {
    setIsLoading(true);
    const fetchQuote = async () => {
      try {
        const req = await fetch("https://api.quotable.io/random");
        const resp = await req.json();

        setQuote(resp.content);
        setAuthor(resp.author);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, [clicker]);

  return isLoading ? (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <div className="title">Quotweet</div>
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher></ColorModeSwitcher>
            <div className="box">
              <div className="content">
                  <blockquote>
                    <p>loading...</p>
                  </blockquote>
              </div>
            </div>
        </Grid>
        <button className="btn-new" onClick={() => setClicker(!clicker)}>New Quote</button>
        <a href={`https://twitter.com/intent/tweet?text=${quote} -${author}`} target="_blank"><button className="btn-tweet">Tweet Quote</button></a>
      </Box>
    </ChakraProvider>
  ) : error ? (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <div className="title">Quotweet</div>
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher></ColorModeSwitcher>
            <div className="box">
              <div className="content">
                  <blockquote>
                    <p>{error}</p>
                  </blockquote>
              </div>
            </div>
        </Grid>
        <button className="btn-new" onClick={() => setClicker(!clicker)}>New Quote</button>
        <a href={`https://twitter.com/intent/tweet?text=${quote} -${author}`} target="_blank"><button className="btn-tweet">Tweet Quote</button></a>
        </Box>
      </ChakraProvider>
  ) : (
    <>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <div className="title">Quotweet</div>
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher></ColorModeSwitcher>
          <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          >
            <div className="box">
              <div className="content">
                  <blockquote>
                  <p>{quote}</p>
                    <p>
                      <small>- {author}</small>
                    </p>
                  </blockquote>
              </div>
            </div>
          </motion.div>
        </Grid>
        <button className="btn-new" onClick={() => setClicker(!clicker)}>New Quote</button>
        <a href={`https://twitter.com/intent/tweet?text=${quote} -${author}`} target="_blank"><button className="btn-tweet">Tweet Quote</button></a>
      </Box>
    </ChakraProvider>
    </>
  );
};
