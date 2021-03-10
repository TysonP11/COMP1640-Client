import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AllArticles from '../../components/Article/AllArticles'
import { getAllArticles, getArticlesByProps } from '../../redux/actions/article'
import { getCampaigns } from '../../redux/actions/campaign'
import Spinner from '../../components/Common/Spinner'
import ArticleToolbar from '../../components/Article/ArticleToolbar'
import ArticleBreadcrumbs from '../../components/Article/ArticleBreadcrumbs'

export const AllArticlesPage = ({
  getAllArticles,
  article: { articles, loading },
  campaign,
  getCampaigns,
  getArticlesByProps,
}) => {
  useEffect(() => {
    getAllArticles()
    getCampaigns()
    // eslint-disable-next-line
  }, [])

  return loading || !campaign || campaign.loading ? (
    <Spinner />
  ) : (
    <>
      <ArticleBreadcrumbs />
      <ArticleToolbar
        campaigns={campaign.campaigns}
        getArticlesByProps={getArticlesByProps}
      />
      <AllArticles articles={articles} />
    </>
  )
}

AllArticlesPage.propTypes = {
  getAllArticles: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  campaign: PropTypes.object.isRequired,
  getCampaigns: PropTypes.func.isRequired,
  getArticlesByProps: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  article: state.article,
  campaign: state.campaign,
})

export default connect(mapStateToProps, {
  getAllArticles,
  getCampaigns,
  getArticlesByProps,
})(AllArticlesPage)
