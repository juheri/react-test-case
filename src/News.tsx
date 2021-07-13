import React, { Component } from "react"; // let's also import Component
import { getNews } from "./api/NewsApi";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import { newsEntity } from "./model/newsEntity";
import { loader } from './components/loader'
import InfiniteScroll from "react-infinite-scroll-component";

interface State {
  news: newsEntity[];
  isLoading: Boolean;
  isError: Boolean;
  page: number;
}
interface Props {}

class News extends Component<Props, State> {
  constructor(props: State) {
    super(props);
    this.state = {
      news: [],
      isLoading: false,
      isError: false,
      page: 1,
    };
  }

  componentWillMount() {
    this.setState({
      isLoading: true,
    });
  }

  componentDidMount() {
    getNews(1)
      .then((result) => {
        let news = result.data.articles;
        this.setState({
          isLoading: false,
          isError: false,
          news,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isError: true,
        });
      });
  }

  addPage() {
    let result = this.state.page + 1;
    this.setState({
      page: result,
    });
  }

  fetchMoreData() {
    this.addPage();
    getNews(this.state.page)
      .then((result) => {
        let news = result.data.articles;
        setTimeout(() => {
          this.setState({
            isLoading: false,
            isError: false,
            news: [...this.state.news, ...news],
          });
        }, 1500);
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isError: true,
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          loader()
        ) : this.state.news.length === 0 && this.state.isError === false ? (
          "Tidak ada data"
        ) : this.state.news.length > 0 && this.state.isError === false ? (
          <Container>
            <div>
              <InfiniteScroll
                dataLength={this.state.news.length}
                next={() => (this.state.isError ? null : this.fetchMoreData())}
                hasMore={this.state.isError ? false : true}
                loader={<h1>Loading...</h1>}
              >
                <Row>
                  {this.state.news.map((news, i) => (
                    <Col xs={12} md={4} key={i}>
                      <Card>
                        <CardImg
                          top
                          width="100%"
                          src={
                            news.urlToImage ? news.urlToImage.toString() : ""
                          }
                          alt="Card image cap"
                        />
                        <CardBody>
                          <CardTitle tag="h5">{news.title}</CardTitle>
                          <CardSubtitle tag="h6" className="mb-2 text-muted">
                            {news.author}
                          </CardSubtitle>
                          <CardSubtitle tag="h6" className="mb-2 text-muted">
                            {new Date(news.publishedAt).toString()}
                          </CardSubtitle>
                          <CardText>{news.content}</CardText>
                          <Button
                            onClick={() =>
                              window.open(news.url?.toString(), "_blank")
                            }
                          >
                            Detail
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </InfiniteScroll>
            </div>
          </Container>
        ) : this.state.isError ? (
          "Maaf terjadi kasalahan"
        ) : null}
      </React.Fragment>
    );
  }
}

export default News;
