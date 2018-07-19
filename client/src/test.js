import React from 'react'

class Test extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         log: false
    //     }
    // }
    // componentDidMount() {
    //     let login = localStorage.getItem('login')
    //     console.log(login)
    //     if (login) {
    //         this.setState({
    //             log: login
    //         })
    //     }
    // }

    // LogOut = (e) => {
    //     localStorage.removeItem('login')
    //     this.setState({
    //         log: false
    //     })
    //     this.props.history.push('/connexion')
    // }
    
    
    render () {
        return (
            <div>
                <div>
                <h2>Home</h2>
                {/* {this.state.log ? <h1> YOLOOOO </h1> : <span> Ta mere </span>} */}
                {/* <button onClick={this.LogOut}>heloo</button> */}
                </div>
                <div>
                    <a href='/profil'>Profil</a>
                    {/* <p>{localStorage.login}</p>
                    <p>{localStorage.id}</p> */}
                    <select class="mdb-select">
                        <option value="" disabled selected>Gender</option>
                        <option value="1">Homme</option>
                        <option value="2">Femme</option>
                        <option value="3">Autre</option>
                    </select>
                    {/* <label>Example label</label> */}

                    <button id="update">Update Option</button>
                </div>
            </div>
        )
    }
}
export default Test
