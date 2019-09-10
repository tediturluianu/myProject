import React, {Component} from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";





document.addEventListener("DOMContentLoaded", function event() {

    class PickDate extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                startDate: new Date()
            };
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange(date) {
            this.setState({
                startDate: date
            });
        }

        render() {
            return (
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
            );
        }
    }

    class Footer extends Component {
        render() {
            return (
                <footer>
                    <div></div>
                    <ul>
                        <li><a href="https://facebook.com" className="fa fa-facebook"></a></li>
                        <li><a href="https://instagram.com" className="fa fa-instagram"></a></li>
                        <li><a href="https://youtube.com" className="fa fa-youtube"></a></li>
                        <li><a href="https://soundcloud.com" className="fa fa-soundcloud"></a></li>
                    </ul>
                </footer>
            )
        }
    }
    class ImageUpload extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                file: '',
                imagePreviewUrl: ''
            };
        }

        handleSubmit = (e) => {
            e.preventDefault();
            console.log('handle uploading-', this.state.file);
        };

        handleImageChange = (e) => {
            e.preventDefault();

            let reader = new FileReader();
            let file = e.target.files[0];

            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            };

            reader.readAsDataURL(file)
        };

        render() {
            return (
                <div className="previewComponent">
                    <form onSubmit={(e)=>this.handleSubmit(e)}>
                        <input className="fileInput"
                               type="file"
                               onChange={(e)=>this.handleImageChange(e)} />
                        <button className="submitButton"
                                type="submit"
                                onClick={(e)=>this.handleSubmit(e)}>Upload artwork</button>
                    </form>
                </div>
            )
        }
    }
    class Events extends Component {
        render() {
            let {name, lineUp, venue, promoter, date, description} = this.props.data;
            return (
                <div className={"latest-events"}>
                    <span>{name}</span>
                    <span>{venue}</span>
                    <span>{date}</span>
                    <span>{lineUp}</span>
                    <span>{promoter}</span>
                    <span>{description}</span>
                </div>
            )
        }
    }

    class SubmitEvents extends Component {
        constructor (props){
            super (props)
            this.state= {
                name:"",
                lineUp:"",
                venue: "",
                promoter:"",
                date:"",
                description:"",
                hasErrors:false,
                errors:[],
                dest:[]
            }
        }
        handleChange = (event) => {
            this.setState({
                [event.target.name]:event.target.value
            })
        };
        handleSubmit = (event) => {
            event.preventDefault();
            let errors = [];
            let dest = [];
            this.state.dest.map((e)=>{
                return dest.push(this.state.value)
            });
            console.log(dest);

            if(this.state.name.trim() == "") {
                errors.push("Insert event name");
            }
            if(this.state.date.trim() != "") {
                errors.push("Pick a date");
            }

            if(this.state.lineUp.trim() == "") {
                errors.push("Insert line-up ");
            }
            if(this.state.venue.trim() == "") {
                errors.push("Insert venue");
            }
            if(this.state.promoter.trim() == "") {
                errors.push("Insert promoter`s name");
            }

            if(this.state.description.trim() == "") {
                errors.push("Insert description");
            }
            console.log(errors);
            if(errors.length > 0) {

                this.setState({
                    hasErrors:true,
                    errors:errors
                })
            } else {
                this.setState({
                    hasErrors:false
                })
                if(typeof this.props.onSubmit === 'function') {
                    this.props.onSubmit(this.state);
                }
            }

        };
        render() {
                    let errDiv = this.state.hasErrors ? <div style={{color:'#4eb5f1'}}> {this.state.errors.join("/ ")}</div> : null;
                    return (
                        <div className={"firstContainer"} id="submitEvent" >
                            <form action={"/"} onSubmit={this.handleSubmit} className={"form"}>
                                {errDiv}
                                <label>
                                    Name
                                </label>
                                <input type={"text"}
                                       name={"name"}
                                       value={this.state.name}
                                       onChange={this.handleChange}
                                />
                                <label>
                                    Pick a date
                                </label>
                                <PickDate />
                                <label>
                                    Venue
                                </label>
                                <input type={"text"}
                                       name={"venue"}
                                       value={this.state.venue}
                                       onChange={this.handleChange}
                                />
                                <label>
                                    Promoter
                                </label>
                                <input type={"text"}
                                       name={"promoter"}
                                       value={this.state.promoter}
                                       onChange={this.handleChange}
                                />
                                <label>
                                    Line-up
                                </label>
                                <input type={"text"}
                                       name={"lineUp"}
                                       value={this.state.lineUp}
                                       onChange={this.handleChange}
                                />
                                <label>
                                    Describe your event
                                </label>
                                <textarea
                                    name={"description"}
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                />
                                    <ImageUpload className={"imageUpload"}/>

                                    <input type={"submit"} defaultValue={"Submit"} className={"formBtn"}/>
                        </form>
                        </div>)
        }
    }

    class MainEvent extends Component{
        constructor(props) {
            super(props);
            this.state = {
                data:{},
                source:[],
                dest:[]
            }
        }

        onDataFinished = (data) => {
            this.setState({data:data});
        };

        handleMove = (event) => {
            let val = event.target.innerText;
            let newSource = this.state.source.filter((element)=>{
                return element != val;
            });
            let newDest = this.state.dest;

            newDest.push(val);

            this.setState({
                source: newSource,
                dest: newDest
            })

        };
        render() {
            return (
                <>
                    <SubmitEvents name={"source"} onSubmit={this.onDataFinished}>
                        {this.state.source.map((element,index)=> {
                            return <div key={index} onClick={this.handleMove}>{element}</div>
                        })}
                    </SubmitEvents>
                    <Events name={"dest"} data={this.state.data}>
                        {this.state.dest.map((element,index)=> {
                            return (
                                <div key={index}>{element}</div>
                            )
                        })}
                    </Events>
                </>
            )
        }
    }

    class Header extends Component {
        handleEvents = (e)=>{
            e.preventDefault();
            console.log("hello")
        };
        render() {
            return (
                <header className={"header"}>
                    <div id={"logo"}></div>
                    <ul className={"headerList"}>
                        <li>
                            <a href={"/"}>Home</a>
                        </li>
                        <li>
                            <a href={"/"}>Happening Tonight</a>
                        </li>
                        <li>
                            <a href={"/"}>Events</a>
                        </li>
                        <li>
                            <a href={"#submitEvent"} onClick={this.handleEvents}>Submit event</a>
                        </li>
                    </ul>
                </header>
            )
        }
    }
    const imgUrls = [
        "https://images.unsplash.com/photo-1513670144176-2211a82b531f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "https://xceed.me/blog/wp-content/uploads/2018/05/Image-uploaded-from-iOS-3.jpg",
        "https://www.electronicbeats.net/app/uploads/sites/9/2018/04/club-eden-%C2%A9-Valeriu-Catalineanu.jpg",
        "https://i0.wp.com/trommelmusic.com/wp-content/uploads/2018/10/MidiZurich_websize-6.jpg?fit=2048%2C1279&ssl=1",
        "https://thelondoner.eu/wp-content/uploads/2016/12/uk-fabric-london.jpg"];


    class Slider extends Component{
        constructor (props) {
            super (props);
            this.nextSlide = this.nextSlide.bind(this);
            this.previousSlide = this.previousSlide.bind(this);
            this.state = {
                currentImageIndex: 0
            }
        }

        previousSlide ()  {
            const lastIndex = imgUrls.length - 1;
            const { currentImageIndex } = this.state;
            const shouldResetIndex = currentImageIndex === 0;
            const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;

            this.setState({
                currentImageIndex: index
            });
        }

        nextSlide () {
            const lastIndex = imgUrls.length - 1;
            const { currentImageIndex } = this.state;
            const shouldResetIndex = currentImageIndex === lastIndex;
            const index =  shouldResetIndex ? 0 : currentImageIndex + 1;

            this.setState({
                currentImageIndex: index
            });
        }
        render() {

            const ImageSlide = ( {url , children}) => {

                const styles = {
                    backgroundImage: `url(${url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height:"100%",
                    width:"100%"
                };
                return (
                    <div className="image-slide" style={styles}>{children}</div>
                );
            };

            const Arrow = ({ direction, clickFunction }) => (
                <div
                    className={ `slide-arrow-${direction}` }
                    onClick={ clickFunction }>

                </div>
            );

            return (
                <div className={"slide"}>

                    <ImageSlide url={ imgUrls[this.state.currentImageIndex] }>
                        <Arrow
                            direction="right"
                            clickFunction={ this.nextSlide }
                        />
                        <Arrow
                            direction="left"
                            clickFunction={ this.previousSlide }
                        />
                    </ImageSlide>

                </div>
            )
        }
    }
    class App extends Component {
        render() {
            return (
                <>
                    <Header/>
                    <Slider/>
                    <MainEvent/>
                    <Footer/>
                </>
            )
        }
    }


    ReactDOM.render(
        <App/>,
    document.getElementById("app")
    )
});