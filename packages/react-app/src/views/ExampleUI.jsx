import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";

import { Address, Balance, Events } from "../components";

export default function ExampleUI({ tx, graphdata, writeContracts }) {
  const yourTokens = graphdata?.holder?.tokens;
  console.log({ yourTokens });
  const zeroAddress = "0x0000000000000000000000000000000000000000";
  const [tokens, setTokens] = useState("");

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              /* look how you call setPurpose on your contract: */
              tx(
                writeContracts.EditionMinter.mint("0x565AD8CB12Bb112891615b581034dB687ff910db", 1, 1, zeroAddress, {
                  value: utils.parseEther("0.01"),
                }),
              );
            }}
          >
            Mint 1
          </Button>
          <br />
          Your Tokens: {yourTokens?.length ? JSON.stringify(yourTokens.map(t => t.tokenId)) : "n/a"}
          <br />
          {yourTokens?.length > 1 && (
            <div>
              <Input
                onChange={e => {
                  setTokens(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  /* look how you call setPurpose on your contract: */
                  tx(writeContracts.SongEdition.setApprovalForAll("0x9cECb83bd342E17AA89C83599425257b92a9F338", true));
                }}
              >
                Approve
              </Button>
              <Button
                onClick={() => {
                  const parsed = tokens.split(",").map(t => parseInt(t));
                  console.log({ parsed });
                  tx(writeContracts.RedemptionMinter.mint("0xA64e1BD6aA6Ee861b77947ff2f5653247787220F", 0, parsed));
                }}
              >
                Redeem
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
