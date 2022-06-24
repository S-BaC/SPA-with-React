import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
            <motion.div
                drag
                dragConstraints={{left:0,top:0, right:0, bottom:0}}
                dragElastic={0.1}
            >
                <motion.svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <motion.path animate={{pathLength: 1}}  stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </motion.svg>
                <Link to="/app"> Application </Link> |
                <Link to="/posts"> Overview </Link>
            </motion.div>
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

        this.containerVariants = {
            hidden: {
                opacity: 0
            },
            visible: {
                opacity: 1,
                x: '100px'
            }
        }
    }

    deleteBtn (obj) {
        this.setState({
            posts: this.state.posts.filter(post => post.id != obj.id)
        })
    }

    render () {
        return (
            <Router>
                <motion.h2 
                variants={this.containerVariants}
                whileHover={{
                    x: '100px', y:'10px', rotateZ:'-1deg', color: "yellow", scale: [2,1,3,2,1,1,2,3], originX:0
                }}
                intial="hidden"
                transition={{duration: 1, type:'spring', stiffness: 150, yoyo: 10}}
                animate = "visible">
                    Welcome
                </motion.h2>
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

