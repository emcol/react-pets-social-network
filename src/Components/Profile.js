import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userData: null }
  }
  loadUserData() {
    this.fetchID = fetchUserData(this.props.username,
      (userData) => { this.setState({ userData })}
    )
  }
  componentDidMount() {
    this.loadUserData();
  }
  componentWillUnmount() {
    cancelFetch(this.fetchID);
  }
  componentDidUpdate(prevPops) {
    if (this.props.username !== prevPops.username) {
      cancelFetch(this.fetchID);
      this.fetchID = fetchUserData(this.props.username,
        (userData) => { this.setState({ userData })}
      )
    }
  }
  render() {
    //isLoading is false if the component got de user data
    const isLoading = this.state.userData === null;

    let className = 'Profile';
    if (isLoading) {
      className += ' loading';
    }

    const name = this.state.userData === null ? 'Loading...' : this.state.userData.name;
    const bio = this.state.userData === null ? 'Loading...' : this.state.userData.bio;
    const friends = this.state.userData === null ? [] : this.state.userData.friends;

    return (
      <div className={className}>
        <div className="profile-picture">{!isLoading && (<img src={this.state.userData.profilePictureUrl} alt={name} />)}</div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{!isLoading && this.props.username}</h3>
          <p>{bio}</p>
          <hr />
          <h3>{name}'s Friends</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }
}