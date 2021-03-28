import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './HeaderHomePage';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Sidebar from './Sidebar';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Business', url: '#' },
];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  social: [
    {
      name: 'GitHub',
      icon: GitHubIcon,
      dest: 'https://github.com/cuong220520/COMP1640-Client',
    },
    { name: 'Twitter', icon: TwitterIcon, dest: '#' },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      dest: 'https://www.facebook.com/profile.php?id=100009249044059',
    },
  ],
};

export default function HomePageComponent({
  articles,
  getArtcsByCampaign,
  campaigns,
  pagination,
  getArtcsByFaculty,
  userDetails,
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Header title='G-MAG NEWS' sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          {/* <Grid container spacing={4}>
            
          </Grid> */}
          <Grid container spacing={3} className={classes.mainGrid}>
            {articles && articles.length > 0 ? (
              <>
                <Grid item xs={12} md={9}>
                  <div>
                    {articles.map((article) => (
                      <FeaturedPost key={article.id} article={article} />
                    ))}
                  </div>
                  <Pagination
                    count={pagination.totalPages}
                    onChange={(e, val) =>
                      getArtcsByFaculty(
                        userDetails.faculty_code,
                        'ACCEPTED',
                        val - 1
                      )
                    }
                  />
                </Grid>
              </>
            ) : (
              <Grid item xs={12} md={9}>
                <Spinner />
              </Grid>
            )}
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              campaigns={campaigns}
              social={sidebar.social}
              getArtcsByCampaign={getArtcsByCampaign}
            />
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}

HomePageComponent.propTypes = {
  articles: PropTypes.array.isRequired,
  getArtcsByCampaign: PropTypes.func.isRequired,
  getArtcsByFaculty: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
};
