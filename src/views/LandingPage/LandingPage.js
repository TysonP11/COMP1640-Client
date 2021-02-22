import React from 'react'
import { connect } from 'react-redux'

export const LandingPage = () => {
  return <div>HomePage</div>
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
