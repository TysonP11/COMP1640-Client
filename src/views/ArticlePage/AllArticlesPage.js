import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AllArticles from '../../components/Article/AllArticles'
import {
  getAllArticles,
  getArticlesByProps,
  getArticlesByFaculty,
  updateArticle,
  getArticle,
  setFilterProps,
} from '../../redux/actions/article'
import { getCampaigns } from '../../redux/actions/campaign'
import Spinner from '../../components/Common/Spinner'
import ArticleToolbar from '../../components/Article/ArticleToolbar'
import ArticleBreadcrumbs from '../../components/Article/ArticleBreadcrumbs'
import { Pagination } from '@material-ui/lab'

export const AllArticlesPage = ({
  article: { articles, loading, pagination, article, filterProps },
  campaign,
  getCampaigns,
  getArticlesByProps,
  auth,
  getArticlesByFaculty,
  getArticle,
  updateArticle,
  setFilterProps,
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

  const [page, setPage] = useState(0)

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
        page={page}
        setFilterProps={setFilterProps}
      />
      <AllArticles
        articles={articles}
        updateArticle={updateArticle}
        getArticle={getArticle}
        article={article}
        loading={loading}
        filterProps={filterProps}
        facultyCode={auth.user.details.faculty_code}
        page={page}
      />
      <Pagination
        count={pagination.totalPages}
        onChange={(e, val) => setPage(val)}
      />
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
  getArticle: PropTypes.func.isRequired,
  updateArticle: PropTypes.func.isRequired,
  setFilterProps: PropTypes.func.isRequired,
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
  getArticle,
  updateArticle,
  setFilterProps,
})(AllArticlesPage)
