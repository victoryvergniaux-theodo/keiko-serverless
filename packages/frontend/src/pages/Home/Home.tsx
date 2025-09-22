import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { useState } from 'react';
import nft1 from 'assets/nft1.png';
import nft2 from 'assets/nft2.png';
import nft3 from 'assets/nft3.png';
import nft4 from 'assets/nft4.png';
import nft5 from 'assets/nft5.png';
import axios from 'axios';

import { ApeNFT, BackgroundPaper } from './Home.style';
import { useAudio } from 'hooks';

import coin from '../../assets/coin.mp3';
import kumo from 'assets/kumo.svg';
import { useAsync } from 'react-use';

const users = [{ 1: 'user1' }, { 2: 'user2' }, { 3: 'user3' }, { 4: 'user4' }];

const client = axios.create({
  baseURL: process.env.VITE_API_URL,
});

interface ApeNFTProps {
  id: string;
  positionX: number;
  positionY: number;
  src: string;
}

interface ApeNFTData {
  id: string;
  positionX: number;
  positionY: number;
  imageIndex: number;
}

interface UserData {
  id: string;
  name: string;
  score: number;
}

const ApeNFTImgs = [nft1, nft2, nft3, nft4, nft5];

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const getNFTPrice = () => randomIntFromInterval(0, 100000);

const Home = (): JSX.Element => {
  const [apeNFTs, setApeNFTs] = useState<ApeNFTProps[]>([]);

  const [activeUser, setActiveUser] = useState(1);

  const [userData, setUserData] = useState<UserData>({
    id: 'fake',
    name: 'no name',
    score: 0,
  });

  function nextUser(): number {
    let nextUser = activeUser;
    activeUser < 4 ? (nextUser = activeUser + 1) : (nextUser = 1);
    return nextUser;
  }

  useAsync(async () => {
    const { data } = await client.get<ApeNFTData[]>('/nfts');
    const { data: userData } = await client.get<UserData>(
      '/users/' + activeUser,
    );
    console.log(data);
    console.log({ userData });
    setApeNFTs(
      data.map(apeNFT => ({
        ...apeNFT,
        src: ApeNFTImgs[apeNFT.imageIndex],
      })),
    );
    if (!userData) throw new Error('Incorrect user id');
    setUserData(userData);
  });

  const setUserScore = async (score: number) => {
    if (!userData) throw new Error('No authentified user');
    setUserData({ id: userData.id, name: userData.name, score: score });
    await client.put('/users/' + userData.id, { score: score });
  };

  const buyApeNFT = async () => {
    if (!userData) throw new Error('No authentified user');
    await client.post('/nfts');
    const { data } = await client.get<ApeNFTData[]>(`/nfts`);

    setApeNFTs(
      data.map(apeNFT => ({
        ...apeNFT,
        src: ApeNFTImgs[apeNFT.imageIndex],
      })),
    );
    await setUserScore(userData.score - getNFTPrice());
    setActiveUser(nextUser);
  };

  const sellApeNFT = async (apeNFTId: string) => {
    if (!userData) throw new Error('No authentified user');
    await client.delete(`/nfts/${apeNFTId}`);

    setApeNFTs(prevApeNFTs => prevApeNFTs.filter(({ id }) => id !== apeNFTId));
    setUserScore(userData.score - getNFTPrice());
    setActiveUser(nextUser);
  };
  const audio = useAudio(coin, { volume: 0.8, playbackRate: 1 });

  return (
    <Box display="flex" flexDirection="column" height="100vh" maxWidth="100%">
      <AppBar position="sticky">
        <Toolbar style={{ backgroundColor: '#181173' }}>
          <Button>
            <a href="https://dev.to/kumo">
              <img
                src={kumo}
                width="auto"
                height="50px"
                style={{ marginTop: '15px' }}
              />
            </a>
          </Button>
          <Typography variant="h1" sx={{ flexGrow: 1 }}>
            {'Learn Serverless with Bored Apes'}
          </Typography>
          <Typography
            variant="h1"
            color={userData.score > 0 ? 'green' : 'red'}
            style={{
              padding: '10px',
              backgroundColor: '#f2b056',
              marginTop: '5px',
              marginBottom: '5px',
            }}
            border={userData.score > 0 ? '4mm solid green' : '4mm solid red'}
          >
            {`Score: ${userData.score.toString().padStart(10, ' ')} $`}
          </Typography>
        </Toolbar>
      </AppBar>
      <BackgroundPaper>
        <Box
          display="flex"
          flexDirection="row"
          height="100vh"
          paddingLeft="10%"
          paddingRight="10%"
          justifyContent="space-between"
          maxWidth="100%"
        >
          <Box>
            {apeNFTs.map(apeNFT => (
              <ApeNFT
                height="100px"
                key={apeNFT.id}
                positionx={apeNFT.positionX}
                positiony={apeNFT.positionY}
                src={apeNFT.src}
                onClick={() => {
                  sellApeNFT(apeNFT.id);
                  audio.play();
                }}
              ></ApeNFT>
            ))}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            textAlign="center"
            style={{
              position: 'absolute',
              top: '35%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Button onClick={buyApeNFT}>
              <Typography color="lightblue" fontSize={50}>
                {'Buy ApeNFT'}
              </Typography>
            </Button>
          </Box>
        </Box>
      </BackgroundPaper>
    </Box>
  );
};

export default Home;
