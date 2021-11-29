import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
//import './List.css';

class List extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    listItems: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  afterEdit(){

  }

  render() {
    const fn = item => 
      <ListItem 
        key={item.id} 
        onDelete={() => this.props.onDelete(item.id)}
        item={item}
        user={this.props.user}
        refresh={this.props.refresh}
      />;
    
    let listItems = this.props.listItems;
        
    if (listItems.length > 0) {
      listItems = listItems.map(fn);
    } else {
      listItems = <li className="list__empty-list">
          Lista vuota. <br /> Aggiungi un nuovo evento
        </li>;
    }

    return (
      <ul className="list">
        {listItems}
      </ul>
    );
  }
}


export default List;