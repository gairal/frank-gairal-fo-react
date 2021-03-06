import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import SkillCard from './SkillCard';

export default class Skill extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    skills: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    skills: [],
  };

  componentDidMount() {
    const { load } = this.props;
    load();
  }

  render() {
    const { skills } = this.props;
    return (
      <section>
        <Grid container>
          {skills.map(category => (
            <Grid item xs={12} key={category.name}>
              <SkillCard category={category} />
            </Grid>
          ))}
        </Grid>
      </section>
    );
  }
}
