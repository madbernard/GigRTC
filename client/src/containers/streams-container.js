import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getActivePerformances } from '../actions';

import GridList from '../../node_modules/material-ui/lib/grid-list/grid-list';
import GridTile from '../../node_modules/material-ui/lib/grid-list/grid-tile';
import StarBorder from '../../node_modules/material-ui/lib/svg-icons/toggle/star-border';
import IconButton from '../../node_modules/material-ui/lib/icon-button';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 800,
    height: 600,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

// var tilesData = [
  // {
  //   img: '../../public/img/crowd.jpg',
  //   title: 'Honey and Cigarettes',
  //   author: 'Peter, Paul, & Mary'
  // },
  // {
  //   img: '../../public/img/crowd.jpg',
  //   title: 'Honey Money',
  //   author: 'Metallica'
  // },
  // {
  //   img: '../../public/img/crowd.jpg',
  //   title: 'Booze and Cigarettes',
  //   author: 'Megadeath'
  // },
  // {
  //   img: '../../public/img/crowd.jpg',
  //   title: 'Honey Heart',
  //   author: 'Metallica'
  // },
  // {
  //   img: '../../public/img/crowd.jpg',
  //   title: 'Cigarettes and Whiskey',
  //   author: 'Peter, Paul, & Mary'
  // },
  // {
  //   img: '../../public/img/crowd.jpg',
  //   title: 'Water Honey',
  //   author: 'Metallica'
  // },
  // {
  //   img: '../../public/img/crowd.jpg',
  //   title: 'Water Plant',
  //   author: 'Megadeath'
  // }
// ];

export class StreamsContainer extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.getActivePerformances()
  }

  render () {
    return(
      <div style={ styles.root }>
        <GridList cellHeight={ 180 } style={ styles.gridList }>
          { this.renderEvents() }
        </GridList>
      </div>
    )
  }

  renderEvents () {
    return this.props.data.map((performance)=> {
      return (

        <Link to={`activeStream/${performance.id}`}>
          <GridTile
          key={performance.id}
          title={performance.title}
          subtitle={<span>by <b>{performance.user_id}</b></span>}
          actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
          >
          <img src='../../public/img/crowd.jpg' />
          </GridTile>
        </Link>
      )
    })
  }

}

function mapStateToProps(state){
  return {
    data : state.data.activeStreams
  }
}

const mapDispatchToProps = {
  getActivePerformances
};

export default connect(mapStateToProps,mapDispatchToProps)(StreamsContainer)
