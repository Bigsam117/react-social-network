// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { push } from 'react-router-redux'
import SvgClose from 'material-ui/svg-icons/navigation/close'
import { grey400 } from 'material-ui/styles/colors'

// - Import app components
import UserAvatar from 'components/userAvatar'

// - Import API

// - Import actions
import * as notifyActions from 'actions/notifyActions'

import { INotifyItemComponentProps } from './INotifyItemComponentProps'
import { INotifyItemComponentState } from './INotifyItemComponentState'

/**
 * Create component class
 */
export class NotifyItemComponent extends Component<INotifyItemComponentProps,INotifyItemComponentState> {

  static propTypes = {
        /**
         * Notification description
         */
    description: PropTypes.string,
        /**
         * Which user relates to the notification item
         */
    fullName: PropTypes.string,
        /**
         * Avatar of the user who relate to the notification item
         */
    avatar: PropTypes.string,
        /**
         * Notification identifier
         */
    id: PropTypes.string,
        /**
         * If user's seen the notification or not (true/false)
         */
    isSeen: PropTypes.bool,
        /**
         * Which address notification refers
         */
    url: PropTypes.string,
        /**
         * The notifier user identifier
         */
    notifierUserId: PropTypes.string,
        /**
         * Close notification popover
         */
    closeNotify: PropTypes.func
  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: INotifyItemComponentProps) {
    super(props)

        // Defaul state
    this.state = {
    }

        // Binding functions to `this`
    this.handleSeenNotify = this.handleSeenNotify.bind(this)
  }

  handleSeenNotify = (event: any) => {
    event.preventDefault()
    const { seenNotify, id, url, goTo, isSeen, closeNotify } = this.props
    if (id) {
      if (!isSeen) {
        seenNotify!(id)
      }
      closeNotify!()
      goTo!(url)
    }
  }

    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {
    let { description, fullName, avatar, isSeen, id, goTo,closeNotify, notifierUserId, url, deleteNotiy } = this.props

    return (

            <div className='item' style={isSeen ? { opacity: 0.6 } : {}} key={id}>
                <div className='avatar'>
                    <NavLink
                        to={`/${notifierUserId}`}
                        onClick={(evt) => {
                          evt.preventDefault()
                          closeNotify!()
                          goTo!(`/${notifierUserId}`)
                        }}
                    >
                        <UserAvatar fullName={fullName} fileName={avatar} />
                    </NavLink>
                </div>
                <div className='info'>
                    <NavLink to={url} onClick={this.handleSeenNotify}>
                        <div className='user-name'>
                            {fullName}
                        </div>
                        <div className='description'>
                            {description}
                        </div>
                    </NavLink>
                </div>
                <div className='close' onClick={() => deleteNotiy!(id)}>
                    <SvgClose hoverColor={grey400} style={{ cursor: 'pointer' }} />
                </div>
            </div>

    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any, ownProps: INotifyItemComponentProps) => {
  return {
    goTo: (url: string) => dispatch(push(url)),
    seenNotify: (id: string) => dispatch(notifyActions.dbSeenNotification(id)),
    deleteNotiy: (id: string) => dispatch(notifyActions.dbDeleteNotification(id))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: INotifyItemComponentProps) => {
  return {

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(NotifyItemComponent as any)
