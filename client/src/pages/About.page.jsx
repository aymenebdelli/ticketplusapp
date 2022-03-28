import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import '../styles/About.css'
import { useHistory } from 'react-router-dom';
import { PageBreadcrumb } from '../components/Breadcrumb';

export const About = () => {
    let history = useHistory()


    return (
        <div className='description'>
            <Row className='about-page'>
                <Col>
                    <PageBreadcrumb page="About" />
                </Col>
            </Row>
            <Row className='description-app'>
                <Col className='mt-2 mb-2'>
                    Customer relationship management (CRM) helps businesses to gain an insight into the behavior of their customers and modify their business operations to ensure that customers are served in the best possible way. In essence, CRM helps a business to recognize the value of its customers and to capitalize on improved customer relations. The better you understand your customers, the more responsive you can be to their needs.
                </Col>
            </Row>
            <Col className='mt-2 video-description'>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/ndPabqQ4osk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>What's CRM(customer relationship management)?</iframe>
                <div>
                    <Button variant="secondary" size="sm" onClick={() => history.push("/dashboard")}>Home Page</Button>
                </div></Col>
            <div className='description-app'>
                <Col className='mt-2 mb-2'>
                    <span>Benefits :</span>
                    Implementing a customer relationship
                    management (CRM) solution might involve considerable
                    time and expense. However, there are many potential benefits.

                    A major benefit can be the
                    development of better relations with
                    your existing customers, which can lead to:
                    <span>
                        increased sales through better timing due
                        to anticipating needs based on historic trends /
                        identifying needs more effectively by
                        understanding specific customer requirements /
                        cross-selling of other products by
                        highlighting and suggesting alternatives or enhancements /
                        identifying which of your
                        customers are profitable and which are not
                    </span>
                </Col>
            </div>

        </div>
    )
}
