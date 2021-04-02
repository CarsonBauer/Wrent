import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Authorization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined
        }
    }

    async componentDidMount() {
        const jwt = localStorage.getItem('user-jwt');
        if (!jwt) {
            this.props.history.push('/login');
        }

        const res = await fetch('/users/get', {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${jwt}`
            }
          }).catch(err => {
            localStorage.removeItem('user-jwt');
            this.props.history.push('/login');
          });

          var res_json = await res.json();
          console.log(res_json['msg']);
          if (res_json['msg'] == "OK") {
            this.setState({
                user: res_json
            })
          } else {
            localStorage.removeItem('user-jwt');
            this.props.history.push('/login');
          }
    }

    render() {
        if (this.state.user === undefined) {
            return (
                <div><h1>Loading...</h1></div>
            )
        }

        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(Authorization);