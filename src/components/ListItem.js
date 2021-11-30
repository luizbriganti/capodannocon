import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiCalendar, mdiClock, mdiAccount, mdiAccountGroup, mdiClose} from '@mdi/js';
import Detail from './Detail';
import Edit from './Edit';
//import './ListItem.css';

class ListItem extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      detail: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onDelete(this.props.item.id);
  }

  closeDetail(){
    this.setState({detail: !this.state.detail})
  }

  render() {
    const item = this.props.item;

    const {title, description, image, date, slot, created_by, min_subscribers, max_subscribers, subscribers} = item

    const hour = new Date(date).toLocaleDateString('it-IT')

    const s = slot === 'diurno' ? '10-15' : (slot === 'pomeridiano' ? '15-20' : (slot === 'serale' ? '21 in poi' : ''))

    return (
      <>
        <li className="list__item" onClick={() => this.setState({detail: true})}>
          <div className="event-card card">
            <div className="event-meta">
              <span className="date"><Icon path={mdiCalendar} size="15px" /> {hour}</span>
              <span className="slot"><Icon path={mdiClock} size="15px" /> {s}</span>
              <span className="author"><Icon path={mdiAccount} size="15px" /> {created_by}</span>
              {//<button onClick={this.handleClick}>×</button>}
              } 
            </div>
            <div className="event-image">
              <img src={image} alt={title} />
            </div>
            <div className="event-info">
              <h5>{title}</h5>
              <p>{description}</p>
            </div>          
            <div className="event-footer">
              <span><Icon path={mdiAccountGroup} size="15px" /> {`${subscribers.length}/${max_subscribers}`}</span>
              <span>
                {
                  subscribers.length > parseInt(min_subscribers) ?
                  <strong>Può iniziare!</strong> :
                  <strong>Partecipanti insufficienti</strong>
                }
              </span>
              <span>{ subscribers.join(', ') }</span>
            </div>
          </div>
        </li>
        {
          this.state.detail ?
            <div className="popup">
              <button type="button" className="btn btn-danger close-form" onClick={() => this.closeDetail()}>
                <Icon 
                  path={mdiClose} 
                  size="20px"
                />  
              </button>
              {
                this.props.user.username === item.created_by ?
                <Edit item={item} close={this.closeDetail.bind(this)} refresh={this.props.refresh}/> :
                <Detail item={item} currentUser={this.props.user.username} refresh={this.props.refresh} />
              }
            </div> : 
            ''
        }
      </>
    );
  }
}

export default ListItem;