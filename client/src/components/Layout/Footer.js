import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, Tab } from '@material-ui/core'

const Footer = props => (
  <footer>
    <Tabs value={0} indicatorColor="primary" textColor="primary" centered>
      <Tab label="@Copyright 2018" />
    </Tabs>
  </footer>
)

export default Footer
