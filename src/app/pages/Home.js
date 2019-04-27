import * as React from 'react';
import { Query } from 'react-apollo';

import LoadingPage from '../components/loading/LoadingPage';
import HomepageStats from '../components/home/HomepageStats';
import LatestAccountabilityPosts from '../components/accountability/LatestAccountabilityPosts';
import LineGraphRender from '../components/graphs/LineGraphRender';

import { HOMEPAGE } from '../../graphql/queries/homepage';

class Home extends React.Component {
  render() {
    return (
      <Query 
        query={HOMEPAGE}
        >
        {({ loading, error, data, client }) => {
          if (loading) return <LoadingPage/>;
          if (error) return `Error! ${error.message}`;

          const {
            getDbUsersStats,
            getAccountabilityMessagesStats,
            getAccountabilityReactsStats,
            getAllDbUsers,
            getAllAccountabilityMessages,
            getAllAccountabilityReacts,
            getAllAccountabilityTally
          } = data;

        //  - Total participants etc.
        //  - Total Accountability posts chart.
        //  - Latest Accountability posts (view all accountability posts.
        //  - The NeverFap Deluxe Bot.
        //  - Get involved.
        //  - Visit the website.

          return (
            <div className="homepage page">
              <div className="single__hero">
                <h1 className="homepage__title title">NeverFap Deluxe League</h1>
                <h2 className="homepage__description">Where porn addiction comes to die.</h2>
              </div>

              <div style={{ marginTop: '3rem', marginBottom: '3rem' }}></div>

              <HomepageStats 
                getDbUsersStats={getDbUsersStats}
                getAccountabilityMessagesStats={getAccountabilityMessagesStats}
                getAccountabilityReactsStats={getAccountabilityReactsStats}
              />

              <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <LineGraphRender collection_type='accountability_messages' graph_type='accumulative'/>
              </div>
              
              <h3 className="homepage__subtitle">Latest Accountability Posts</h3>
              <LatestAccountabilityPosts/>
            </div>
          );
        }}
      </Query>
      
    );
  }
};

export default Home;
