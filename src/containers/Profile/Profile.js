import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
// import Album from '../Album/Album'
import Album from '../Album/List/AlbumList'
import { Container, Row, Col } from 'reactstrap'
import UserInfoWithRedactor from './components/user-info-with-redactor'
import styles from './Profile.module.css'
import { Route, Switch } from 'react-router-dom'
import TodoList from '../../containers/Tasks/components/todo-list'
import ProfileForm from './components/ProfileForm/ProfileForm'
import * as actions from '../../store/actions'
import { loadAlbums } from '../../store/actions'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        id: '',
        name: '',
        address: '',
        phone: '',
        job: '',
        avatarUrl: ''
      },
      albums: this.props.albums,
      tasks: [],
      editorActive: false
    }
  }
  componentDidMount() {
    this.props.loadDataAlbums(this.props.userId, this.props.idToken)
    //fetch user info
    this.props.fetchProfile(this.props.userId, this.props.idToken)
    this.setState({ albums: ['newHero', 'tripToMountains', 'partyForEveryBody'] })
  }

  render() {
    let content
    if (this.props.newUser) {
      content = <ProfileForm />
    } else {
      content = (
        <Container className={styles.profile}>
          <Row className={styles.userAvatarAndInfo}>
            <Col xs="3">
              <img
                className={styles.userAvatar}
                src={this.props.photoURL}
                alt={this.props.firstName + ' ' + this.props.lastName}
              />
            </Col>
            <Col xs="2" className={styles.userInfo}>
              <UserInfoWithRedactor />
            </Col>
            <Col xs="7" className={styles.taskList}>
              <TodoList items={this.props.task.items} />
            </Col>
          </Row>
          <h3>Albums {this.state.albums.length}</h3>
          <Row className={styles.albumsBar}>
            <Album isPropfile={true} />
          </Row>
        </Container>
      )
    }

    return <Fragment>{content}</Fragment>
  }
}

const mapStateToProps = state => {
  return {
    task: state.task,
    userId: state.auth.userId,
    idToken: state.auth.token,
    firstName: state.profile.firstName,
    lastName: state.profile.lastName,
    loading: state.profile.loading,
    photoURL: state.profile.photoURL,
    newUser: state.profile.new,
    albums: state.albums.dataAlbums
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProfile: (userId, idToken) => dispatch(actions.profileFetch(userId, idToken)),
  loadDataAlbums: (userId, authToken) => {
    dispatch(loadAlbums(userId, authToken))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
