import React, { useState, useEffect } from 'react';
import Input from '../Projects/Input';
import CustomTextarea from '../Projects/CustomTextarea';

function PolicyPopup({onPolicyChange, policy, errorNotJson, errorNoTitle}) {
  const handlePolicyNameChange = (value) => {
    onPolicyChange({"id": policy.id, "name": value, "json": policy.json})
  };
  const handlePolicyChange = (value) => {
    onPolicyChange({"id": policy.id, "name": policy.name, "json": value})
  };
  
  return (
    <div>
      <Input onTextChange={handlePolicyNameChange} errorNoTitle={errorNoTitle} value={policy.name} placeholder={"watchProject1"} label={"Name"}/>
      <CustomTextarea errorNotJson={errorNotJson} value={policy.json} label={"Policy"} onTextChange={handlePolicyChange} placeholder={`{
  "policy": {
    "name": "example-policy",
    "effect": "Ask/Allow/Deny",
    "target": {
      "deploy": {
        "namespace": [
          "default",
          "test"
        ],
        "resource": {
          "cpu": "500m",
          "memory": "1024Mi",
          "disk": "200Gi"
        },
        "gvk": [
          "apps/v1/Deployments",
          "networking.k8s.io/v1/Ingress",
          "/vi/Pod"
        ]
      },
      "secret": {
        "path": [
          "/path1/to/secret/*",
          "/path2/to/secret/*"
        ]
      }			
    },
    "action": [
      "Get",
      "Put",
      "Delete",
      "List"
    ]
  }
}`}/>
    </div>
  );
}

export default PolicyPopup;

