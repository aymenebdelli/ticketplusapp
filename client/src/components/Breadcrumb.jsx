import React from 'react'
import { Breadcrumb} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const PageBreadcrumb = ({ page }) => {
    return (
            <Breadcrumb className="border mt-4" style={{borderRadius:"5px"}}>
            <LinkContainer to='/dashboard' >
                <Breadcrumb.Item style={{ fontWeight: 'bold', fontSize: '18px'}}>Home</Breadcrumb.Item></LinkContainer>
                <Breadcrumb.Item active style={{ fontWeight: 'bold', fontSize: '18px' ,color:"white"}}>{page}</Breadcrumb.Item>
            </Breadcrumb>
    )
}
