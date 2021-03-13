import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AllArticles from '../../components/Article/AllArticles'
import {
  getAllArticles,
  getArticlesByProps,
  getArticlesByFaculty,
} from '../../redux/actions/article'
import { getCampaigns } from '../../redux/actions/campaign'
import Spinner from '../../components/common/Spinner'
import ArticleToolbar from '../../components/Article/ArticleToolbar'
import ArticleBreadcrumbs from '../../components/Article/ArticleBreadcrumbs'

export const AllArticlesPage = ({
  getAllArticles,
  article: { articles, loading },
  campaign,
  getCampaigns,
  getArticlesByProps,
  auth,
  getArticlesByFaculty,
}) => {
  useEffect(() => {
    // if (auth.user.authorities.includes('ROLE_ADMIN')) {
    //   getAllArticles()
    // } else {
    getArticlesByFaculty(auth.user.details.faculty_code)
    // }
    getCampaigns()
    // eslint-disable-next-line
  }, [])

  return loading ||
    !campaign ||
    campaign.loading ||
    auth.loading ||
    !auth ||
    !auth.user ? (
    <Spinner />
  ) : (
    <>
      <ArticleBreadcrumbs />
      <ArticleToolbar
        campaigns={campaign.campaigns}
        getArticlesByProps={getArticlesByProps}
        facultyCode={auth.user.details.faculty_code}
      />
      <AllArticles articles={articles.reverse()} />
    </>
  )
}

AllArticlesPage.propTypes = {
  getAllArticles: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  campaign: PropTypes.object.isRequired,
  getCampaigns: PropTypes.func.isRequired,
  getArticlesByProps: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getArticlesByFaculty: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  article: state.article,
  campaign: state.campaign,
  auth: state.auth,
})

export default connect(mapStateToProps, {
  getAllArticles,
  getCampaigns,
  getArticlesByProps,
  getArticlesByFaculty,
})(AllArticlesPage)
