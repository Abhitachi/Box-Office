import React from 'react';
import { useParams } from 'react-router-dom';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import Cast from '../components/show/Cast';
import ShowMainData from '../components/show/ShowMainData';

import { InfoBlock, ShowPageWrapper } from './Show.Styled';
import { useShows } from '../misc/custom-hook';

const Show = () => {
  const { id } = useParams();

  const { show, isLoading, error } = useShows(id);
  //   console.log('params', params);

  if (isLoading) {
    return <div>Data is Loading</div>;
  }
  if (error) {
    return <div>Error occured: {error}</div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
        image={show.image}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          premiered={show.premiered}
          network={show.network}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
