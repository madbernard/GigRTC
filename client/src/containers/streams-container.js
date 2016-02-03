import React, { Component } from 'react';
import {connect} from 'react-redux';
// import stuff that holds getStreams?

import GridList from '../../node_modules/material-ui/lib/grid-list/grid-list';
import GridTile from '../../node_modules/material-ui/lib/grid-list/grid-tile';
import StarBorder from '../../node_modules/material-ui/lib/svg-icons/toggle/star-border';
import IconButton from '../../node_modules/material-ui/lib/icon-button';

/** code mutated from that at:
  * http://www.material-ui.com/#/components/grid-list
  * https://facebook.github.io/react/tips/initial-ajax.html
*/

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

var tilesData = [
  {
    img: '../../public/img/crowd.jpg',
    title: 'Honey and Cigarettes',
    author: 'Peter, Paul, & Mary'
  },
  {
    img: '../../public/img/crowd.jpg',
    title: 'Honey Money',
    author: 'Metallica'
  },
  {
    img: '../../public/img/crowd.jpg',
    title: 'Booze and Cigarettes',
    author: 'Megadeath'
  },
  {
    img: '../../public/img/crowd.jpg',
    title: 'Honey Heart',
    author: 'Metallica'
  },
  {
    img: '../../public/img/crowd.jpg',
    title: 'Cigarettes and Whiskey',
    author: 'Peter, Paul, & Mary'
  },
  {
    img: '../../public/img/crowd.jpg',
    title: 'Water Honey',
    author: 'Metallica'
  },
  {
    img: '../../public/img/crowd.jpg',
    title: 'Water Plant',
    author: 'Megadeath'
  }
];


const GridListExampleSimple = () => (
  <div style={styles.root}>
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      {tilesData.map(tile => (
        <GridTile
          key={tile.title}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default GridListExampleSimple;


var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, function (result) {
      var lastGist = result[0];
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        {this.state.username} last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  mountNode
);

export class StreamsContainer extends Component {

  componentWillMount(){
      //var script   = document.createElement("script");
      //script.type  = "text/javascript";
      //script.src   = "../../public/js/webRTC.js";
      //document.body.appendChild(script);
  }

  render () {
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
          {tilesData.map(tile => (
            <GridTile
              key={tile.title}
              title={tile.title}
              subtitle={<span>by <b>{tile.author}</b></span>}
              actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
            >
              <img src={tile.img} />
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    environment : state.environment
  }
}

export default connect(mapStateToProps)(StreamsContainer)
