import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import GitHubIcon from '@material-ui/icons/GitHub'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import Header from './HeaderHomePage'
import MainFeaturedPost from './MainFeaturedPost'
import FeaturedPost from './FeaturedPost'
import Sidebar from './Sidebar'
import PropTypes from 'prop-types'
import Pagination from '@material-ui/lab/Pagination'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Business', url: '#' },
]

const mainFeaturedPost = {
  title: 'Greenwich University',
  description:
    'Greenwich University (VN) was formed on the basis of the association between Greenwich University (UK) and FPT Education Organization since 2009',
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
}

const sidebar = {
  title: 'About',
  description:
    'Training content, faculty and facilities are accredited and quality recognized by UK experts and the University of Greenwich.',
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
}

export default function HomePageComponent({
  articles,
  getArtcsByCampaign,
  campaigns,
  pagination,
  getArtcsByFaculty,
  userDetails,
  authorities,
  getArtcsByCampaignStatus,
  cpCode,
  getArticlesByStatus,
}) {
  const classes = useStyles()

  const handleChangePage = (val) => {
    if (authorities.includes('ROLE_MARKETING_MANAGER')) {
      if (cpCode && cpCode !== '') {
        getArtcsByCampaignStatus(cpCode, 'ACCEPTED', val - 1)
      } else {
        getArticlesByStatus('ACCEPTED', val - 1)
      }
    } else {
      getArtcsByFaculty(userDetails.faculty_code, 'ACCEPTED', val - 1)
    }
  }

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
                    onChange={(e, val) => handleChangePage(val)}
                  />
                </Grid>
              </>
            ) : (
              <Grid item xs={12} md={9}>
                <Typography>There is no article here</Typography>
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
  )
}

HomePageComponent.propTypes = {
  articles: PropTypes.array.isRequired,
  getArtcsByCampaign: PropTypes.func.isRequired,
  getArtcsByFaculty: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
}
