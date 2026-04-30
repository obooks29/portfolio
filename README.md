# Bukola Jimoh — Cloud and DevOps Engineer Portfolio

**Live site:** https://d1zqsd6vsaz3bz.cloudfront.net

A production-grade portfolio site that is itself the first of 9 cloud engineering projects.
Built with React and Vite, deployed on AWS with automated CI/CD via GitHub Actions.

---

## Projects

### 01 — Multi-Cloud Event Bridge (AWS + GCP)
AWS Lambda writes structured audit logs to a Google Cloud Storage bucket via REST API.
GCP service account credentials are stored in AWS Secrets Manager and retrieved at runtime.
Demonstrates a real enterprise pattern for cross-provider compliance data routing.
**Repo:** https://github.com/obooks29/cross-cloud-bridge

### 02 — GCP Static Site with Cloud CDN
React site deployed to Google Cloud Storage with Cloud CDN for global delivery.
Cloud Build pipeline triggers on every GitHub push and syncs output to the GCS bucket.
**Repo:** https://github.com/obooks29/vela-site

### 03 — Azure Static Web App with OIDC Authentication
React site on Azure Static Web Apps with passwordless OIDC federated identity via Azure Entra ID.
RBAC configured with a dedicated service principal scoped to the resource group only.
**Repo:** https://github.com/obooks29/meridian-site

### 04 — Multi-Environment CI/CD Pipeline (AWS)
Dev, Staging, and Production environments with isolated GitHub Actions workflows per environment.
Manual approval gate on production with branch protection rules on main.

### 05 — Containerised ECS Fargate Deployment (AWS)
Multi-stage Docker build reduces image from 1.2GB to 26.89MB.
Pushed to ECR and deployed on ECS Fargate with no EC2 instances to manage.

### 06 — Infrastructure as Code with Terraform (AWS)
Entire AWS stack defined in Terraform HCL with S3 remote backend and DynamoDB state locking.
Full lifecycle: terraform apply provisions 14 resources in under 3 minutes.
**Repo:** https://github.com/obooks29/terraform-portfolio

### 07 — Observability Dashboard (AWS)
CloudWatch dashboard tracking CPU, memory, disk I/O, and error rate on EC2.
SNS alarm validated with a live stress test: CPU spiked to 99.9%, alert fired in under 90 seconds.

### 08 — Serverless Contact Form API (AWS)
API Gateway triggers Lambda which calls SES. Zero servers, scales to zero, least-privilege IAM.

### 09 — Automated Global Web Hosting (AWS)
S3 and CloudFront with Origin Access Control. HTTPS enforced globally.
GitHub Actions auto-deploys on every push. Cost: ~$0.50 per month.

---

## Tech Stack

- **Frontend:** React, Vite
- **Cloud providers:** AWS (primary), Google Cloud Platform, Microsoft Azure
- **Hosting:** AWS S3, CloudFront with OAC
- **CI/CD:** GitHub Actions (multi-environment with approval gates)
- **IaC:** Terraform
- **Containers:** Docker, AWS ECR, ECS Fargate
- **Monitoring:** CloudWatch, SNS
- **Serverless:** Lambda, API Gateway, SES
- **Security:** IAM least-privilege, OIDC federated identity, Origin Access Control

## Local Development

```bash
npm install
npm run dev       # localhost:5173
npm run build     # production build to dist/
```

## Deployment

Every push to main triggers the GitHub Actions pipeline:
1. Install dependencies
2. Build with Vite
3. Sync dist/ to S3
4. Invalidate CloudFront cache

---

Built by [Bukola Jimoh](https://d1zqsd6vsaz3bz.cloudfront.net)
