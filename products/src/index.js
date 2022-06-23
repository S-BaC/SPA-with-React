import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './index.css';

class Application extends React.Component {
    constructor (props) {
        super (props);

        this.postBtnClicked = this.postBtnClicked.bind(this);
    }
    postBtnClicked (e) {
        e.preventDefault();
        this.props.updatePosts (e.target);
    }
    render () {
        return (
            <form className='blogForm' onSubmit={this.postBtnClicked}>
                <label htmlFor="title">Blog Title</label>
                <input type="text" id="title" />
                <label htmlFor="body">Body</label>
                <input type="text" id="body" />
                <button> Post </button>
            </form>
        )
    }
}

class Overview extends React.Component {
    constructor (props) {
        super (props);
        this.deleteBtn = this.deleteBtn.bind(this);
    }

    deleteBtn (e) {
        this.props.deleteBtn (e.target);
    }

    render () {
        let posts = [];
        this.props.posts.forEach (post => {
            posts.push(
                <div key={post.id}>
                    <Link to={"/posts/"+post.id} className='postTitle'>{post.title}</Link>
                    <div className='postBody'>{post.body}</div>
                    <button id={post.id} onClick={this.deleteBtn}> Delete </button>
                </div>
            )
        });
        
        return (
            <div>
                {posts}
            </div>
        )
    }
}

class Navigation extends React.Component {
    render () {
        return (
            <div>
                <Link to="/app"> Application </Link> |
                <Link to="/posts"> Overview </Link>
            </div>
        )
    }
}

class PostDetails extends React.Component {
    render () {
        return (
            <div>
                <h1>{this.props.data.title}</h1>
                <h5>{this.props.data.body}</h5>
            </div>
        )
    }
}

class Main extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            posts: this.props.data,
            postRoutes: []
        }
        this.updatePosts = this.updatePosts.bind(this);
        this.deleteBtn = this.deleteBtn.bind(this);
    }
    updatePosts (result) {
        this.setState({
            posts: this.state.posts.concat(
                {   title: result[0].value, 
                    body: result[1].value, 
                    id:this.state.posts.length  }
                )
        }, () => {
            result.reset();
            this.renderRoutes();
        })
    }

    componentDidMount () {
        this.renderRoutes();
    }

    renderRoutes () {
        this.postDetails = [];
        this.state.posts.forEach (post => {
            this.postDetails.push(
              <Route path={"posts/" + post.id} element={<PostDetails data={post}/>} key={post.id}/>  
            )
        })
        this.setState({
            postRoutes: this.postDetails
        })
    }

    deleteBtn (obj) {
        this.setState({
            posts: this.state.posts.filter(post => post.id != obj.id)
        })
    }

    render () {
        return (
            <Router>
                <Navigation />
                <Routes>
                    <Route path='/app' element={<Application updatePosts = {this.updatePosts} />}/>
                    <Route path='/posts' element={<Overview posts = {this.state.posts} deleteBtn = {this.deleteBtn} />}/>
                    {this.state.postRoutes}
                </Routes>
            </Router>
            
        )
    }
}

let data = [
    {title: "first blog", body: "blog about ONE", id: 0},
    {title: "second blog here", body: "blog about, wait for it, TWO", id:1}
]

const root = ReactDOM.createRoot (document.getElementById('list'));
root.render(<Main data = {data} />);

