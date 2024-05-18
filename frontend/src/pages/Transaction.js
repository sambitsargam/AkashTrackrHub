import React, { useState } from "react";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import PageTitle from "../components/Typography/PageTitle";
import {
  Input,
  Button,
  HelperText,
  Label,
  Select,
  Textarea,
} from "@windmill/react-ui";

export default function Transaction() {
  const [userAddress, setUserAddress] = useState("");
  const [embeddedUrl, setEmbeddedUrl] = useState("");

  const handleAddressChange = (event) => {
    setUserAddress(event.target.value);
  };

  const handleSubmit = () => {
    setEmbeddedUrl(`http://localhost:3000/addresses/${userAddress}?network=mainnet`);
  };

  return (
    <>
      <PageTitle>Enter Address to View Page</PageTitle>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={6}>
          <Card>
            <Card.Body>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter address"
                value={userAddress}
                onChange={handleAddressChange}
              />
              <Button onClick={handleSubmit} className="mt-4">
                View Page
              </Button>
            </Card.Body>
          </Card>
        </Grid>
        {embeddedUrl && (
          <Grid xs={12}>
            <Card>
              <Card.Body>
                <iframe
                  src={embeddedUrl}
                  width="100%"
                  height="600px"
                  style={{ border: "none" }}
                  title="Embedded Page"
                />
              </Card.Body>
            </Card>
          </Grid>
        )}
      </Grid.Container>
    </>
  );
}
