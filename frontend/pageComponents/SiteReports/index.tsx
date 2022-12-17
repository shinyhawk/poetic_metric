import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Breadcrumb, Col, Container, Row, Spinner } from "react-bootstrap";
import {
  Layout,
  SiteGeoReport,
  SiteOverviewReport,
  SitePathReport,
  SiteReferrerReport,
  SiteReportsFilters,
  SiteReportsFiltersHandler,
  SiteReportsTimeWindowInput,
  SiteTechReport,
  SiteUtmReport,
  SiteVisitorPageViewReport,
  SiteVisitorTrendsReport,
} from "../../components";
import { Title } from "../../components/Title";
import { ToastsContext } from "../../contexts";
import { useQueryNumber, useSite } from "../../hooks";

export function SiteReports() {
  const router = useRouter();
  const id = useQueryNumber("id");
  const { data: site, error } = useSite(id);
  const { addToast } = useContext(ToastsContext);

  useEffect(() => {
    if (id === undefined || error !== undefined) {
      if (error !== undefined) {
        addToast({ body: error.message, variant: "danger" });
      }

      router.replace("/sites");
    }
  }, [addToast, error, id, router]);

  return (
    <Layout>
      <Title>{site === undefined ? "..." : `Reports - ${site.name}`}</Title>

      <Container className="d-flex flex-column flex-grow-1 py-4">
        {site === undefined ? (
          <div className="d-flex flex-grow-1 align-items-center justify-content-center">
            <Spinner />
          </div>
        ) : (
          <SiteReportsFiltersHandler>
            <Breadcrumb>
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>

              <li className="breadcrumb-item">
                <Link href="/sites">Sites</Link>
              </li>
            </Breadcrumb>

            <h1 className="fw-bold">{site.name}</h1>

            <div className="d-flex flex-row">
              <SiteReportsTimeWindowInput />

              <div className="flex-grow-1 w-auto pe-3" />

              <SiteReportsFilters />
            </div>

            <SiteOverviewReport className="mt-3" />

            <Row className="g-3 mt-0">
              <Col lg={8}>
                <SiteVisitorPageViewReport />
              </Col>

              <Col lg={4}>
                <SitePathReport />
              </Col>
            </Row>

            <Row className="g-3 mt-0">
              <Col lg={4}>
                <SiteReferrerReport />
              </Col>

              <Col lg={8}>
                <SiteGeoReport />
              </Col>
            </Row>

            <Row className="g-3 mt-0">
              <Col lg={4}>
                <SiteTechReport />
              </Col>

              <Col lg={4}>
                <SiteVisitorTrendsReport />
              </Col>

              <Col lg={4}>
                <SiteUtmReport />
              </Col>
            </Row>
          </SiteReportsFiltersHandler>
        )}
      </Container>
    </Layout>
  );
}
