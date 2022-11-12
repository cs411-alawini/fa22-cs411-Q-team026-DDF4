import { NextPage } from "next";
import {useRouter} from "next/router";
import {bestSeller, cheapCategory} from "../utils/database";
import {Button} from "@chakra-ui/react";
import {DiscoverOverview} from "../types/types";
import React, {useState} from "react";
import {Box, Container, Flex, Heading, Text} from "@chakra-ui/react";


export const getServerSideProps = async (context: any) => {
  const sellers = await bestSeller();
  const cheaps = await cheapCategory();
  return {
    props: {
      sellers,cheaps
    }
  }
}


const SellerCard: React.FC<{ seller: DiscoverOverview }> = ({ seller }) => {
  return (
      <Box
        border="1px solid lightgray"
        w="800px"
        h="160px"
        p="20px"
      >
        <Flex flexDirection="row" mb="10px">
          <Heading size="md" noOfLines={1}>
            {seller.sellerName}
          </Heading>
          <Box flex={1}/>
          <Heading size="md" noOfLines={1} textAlign="right" w="250px">
            ${seller.turnover}
          </Heading>
          
          <Text fontSize="14px" noOfLines={1}>
          id:{seller.id}
        </Text>
        </Flex>
      </Box>
  )
}

const CheapCard: React.FC<{ cheap: DiscoverOverview }> = ({ cheap }) => {
  return (
      <Box
        border="1px solid lightgray"
        w="800px"
        h="160px"
        p="20px"
      >
        <Flex flexDirection="row" mb="10px">
          <Heading size="md" noOfLines={1}>
            {cheap.name}
          </Heading>
          <Box flex={1}/>
          <Heading size="md" noOfLines={1} textAlign="right" w="250px">
            Count:{cheap.Num_Item}
          </Heading>
        </Flex>
        
      </Box>
  )
}


const Discover: NextPage <{ sellers: DiscoverOverview[], cheaps: DiscoverOverview[]}>= ({sellers, cheaps}) => {
  const [page, setPage] = useState(1);
  return (
    <Container centerContent py="40px">
      <Box>
        <Button colorScheme='blue' onClick={() => setPage(1)}>BestSeller </Button>
        <Button colorScheme='blue' onClick={() => setPage(2)}>CheapCategory </Button>
      </Box>
      {page == 1 && sellers.map(seller => (
        <Box key={seller.id} mb="30px">
            <SellerCard seller={seller}/>
        </Box>
      ))}
      {page == 2 && cheaps.map(cheap => (
        <Box key={cheap.name} mb="30px">
          <CheapCard cheap={cheap}/>
        </Box>
      ))}
    </Container>
  )
}

export default Discover;