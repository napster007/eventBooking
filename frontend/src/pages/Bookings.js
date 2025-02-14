import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/Bookings/BookingList/BookingList';
import BookingsChart from '../components/Bookings/BookingChart/BookingChart';
import BookingControls from '../components/Bookings/BookingControls/BookingControls';
class BookingsPage extends Component {
    state = {
        bookings: [],
        isLoading: false,
        outputType: 'list'
    };


    static contextType = AuthContext;
    componentDidMount() {
        this.setState({ isLoading: true });
        this.fetchBookings();
        // Make API call to fetch bookings
        // this.setState({ bookings: fetchedBookings, isLoading: false });
    }

    deleteBookingHandler = bookingId => {
        this.setState({ isLoading: true });

        const requestBody = {
          query: `
                mutation cancelBooking($id: ID!) {
                    cancelBooking(bookingId: $id) {
                        _id
                        title
                    }
                }
            `,variables: {
            id: bookingId
            }
        };

        fetch("http://localhost:3001/api", {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.context.token
          },
        })
          .then((response) => {
            if (response.status !== 200 && response.status !== 201) {
              throw new Error("Failed!");
            }
            return response.json();
          })
          .then((resData) => {
            this.setState(prevState => {
              const updatedBookings = prevState.bookings.filter(booking => {
                return booking._id !== bookingId;
              });
              return { bookings: updatedBookings, isLoading: false };
            });
          })
          .catch((err) => {
            console.log(err);
            this.setState({ isLoading: false });
          })
          }
          
    
    fetchBookings = () => {
        this.setState({ isLoading: true });

        const requestBody = {
          query: `
                query {
                    bookings {
                        _id
                        createdAt
                        event {
                            _id
                            title
                            date
                            price
                        }
                    }
                }
            `,
        };

        fetch("http://localhost:3001/api", {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + this.context.token
          },
        })
          .then((response) => {
            if (response.status !== 200 && response.status !== 201) {
              throw new Error("Failed!");
            }
            return response.json();
          })
          .then((resData) => {
              const bookings = resData.data.bookings;
              console.log(bookings);
            this.setState({ bookings: bookings, isLoading: false });
          })
          .catch((err) => {
            console.log(err);
            this.setState({ isLoading: false });
          });
    };

    changeOutputTypeHandler = outputType => {
      if(outputType === 'list'){  
        this.setState({outputType: 'list'});

      }else{
        this.setState({outputType: 'chart'});
      }
    }
    render() {
      let content = <Spinner />;
      if(!this.state.isLoading){
        content = (
          <React.Fragment>
            <div><BookingControls activeOutputType={this.state.outputType} onChange={this.changeOutputTypeHandler}/></div>
            <div>
              {this.state.outputType === 'list' ? (
                <BookingList
                  bookings={this.state.bookings}
                  onDelete={this.deleteBookingHandler}
                />
              ) : (
                <BookingsChart bookings={this.state.bookings}/>
              )}
            </div>
          </React.Fragment>
        );
      }
        return (
          <React.Fragment>
            {/* {this.state.isLoading ? (
              <Spinner />
            ) : (

              <BookingList
                bookings={this.state.bookings}
                onDelete={this.deleteBookingHandler}
              />
            )} */}
            {content}
          </React.Fragment>
        );
    }
}

export default BookingsPage;