import React from 'react';
import ReactDOM from 'react-dom/client';
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
                    <div className='postTitle'>{post.title}</div>
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

class Main extends React.Component {

    constructor (props) {
        super (props);
        this.state = {
            posts: this.props.data
        }
        this.updatePosts = this.updatePosts.bind(this);
        this.deleteBtn = this.deleteBtn.bind(this);
    }
    updatePosts (result) {
        this.setState({
            posts: this.state.posts.concat({title: result[0].value, body: result[1].value, id:(this.state.posts.length + 1)})
        })
    }

    deleteBtn (obj) {
        this.setState({
            posts: this.state.posts.filter(post => post.id != obj.id)
        })
    }

    render () {
        return (
            <div>
                <Application updatePosts = {this.updatePosts} />
                <Overview posts = {this.state.posts} deleteBtn = {this.deleteBtn} />
            </div>
        )
    }
}

let data = [
    {title: "first blog", body: "blog about ONE", id: 1},
    {title: "second blog here", body: "blog about, wait for it, TWO", id:2}
]

const root = ReactDOM.createRoot (document.getElementById('list'));
root.render(<Main data = {data} />);

