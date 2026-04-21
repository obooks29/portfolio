# Portfolio - Bukola Jimoh
### Cloud & DevOps Engineer · UI/UX Background

Live site: https://d1zqsd6vsaz3bz.cloudfront.net

A production-grade portfolio site and the first of 6 AWS cloud projects, built, deployed, and automated entirely on AWS.

---

## Projects

### Project 1: Static Site + CI/CD Pipeline
**Services:** AWS S3, CloudFront, IAM, GitHub Actions  
**What:** Portfolio site deployed to S3 with CloudFront as a global CDN. Origin Access Control (OAC) enforces zero public S3 access. GitHub Actions auto-builds and deploys on every push to main, including CloudFront cache invalidation.  
**Outcome:** < 200ms global latency · $0.50/mo · 0 manual deploys

### Project 2: Serverless Contact Form API
**Services:** AWS Lambda (Python), API Gateway, SES, IAM  
**Repo:** https://github.com/obooks29/portfolio  
**What:** Event-driven pipeline, API Gateway receives POST request, invokes Lambda, Lambda calls SES to deliver email. Least-privilege IAM role. CORS and input validation handled in Lambda.  
**Outcome:** Zero servers · scales to zero · free tier

### Project 3: Infrastructure as Code (Terraform)
**Services:** Terraform, AWS S3 (remote state), DynamoDB (state lock)  
**Repo:** https://github.com/obooks29/terraform-portfolio  
**What:** Entire AWS stack reproduced in Terraform HCL. S3 remote backend with DynamoDB state locking. Full lifecycle: `terraform apply` provisions everything in < 3 minutes, `terraform destroy` cleans up completely.  
**Outcome:** Reproducible infrastructure · peer-reviewable · team-safe state management

### Project 4: Observability Dashboard
**Services:** AWS CloudWatch, SNS, EC2, CloudWatch Agent  
**What:** CloudWatch dashboard tracking CPU, memory (via custom agent), EBS, and status checks on EC2. SNS alarm configured to fire when CPU exceeds 60% for 2 consecutive minutes. Live stress test triggered alarm at 99.9% CPU, email received within 90 seconds.  
**Outcome:** Full observability stack · alarm fired in 90s · EC2 terminated after proof

### Project 5: Containerised ECS Deployment
**Services:** Docker, AWS ECR, ECS Fargate, ALB  
**What:** Multi-stage Docker build reduced image from 1.2GB to 26.89MB. Image pushed to ECR, deployed on ECS Fargate (no EC2 management), served via public IP. Portfolio loaded live from the container.  
**Outcome:** 26.89MB image · running Fargate task · 0 servers managed

### Project 6: Multi-Environment CI/CD Pipeline
**Services:** GitHub Actions, AWS S3, CloudFront  
**What:** Three separate GitHub Actions workflows, Deploy to Dev (push to dev branch), Deploy to Staging (push to staging branch), Deploy to Production (push to main, requires manual approval). Production environment protected with required reviewer gate.  
**Outcome:** 3 isolated environments · prod requires approval · full pipeline in 19s

---

## Stack
- **Frontend:** React + Vite
- **Hosting:** AWS S3 + CloudFront (OAC)
- **CI/CD:** GitHub Actions
- **IaC:** Terraform
- **Containers:** Docker + AWS ECR + ECS Fargate
- **Monitoring:** CloudWatch + SNS
- **Serverless:** Lambda + API Gateway + SES

## Local Development
```bash
npm install
npm run dev        # localhost:5173
npm run build      # builds to dist/
```

## Deployment
Every push to `main` triggers the GitHub Actions pipeline:
1. Install dependencies
2. Build with Vite
3. Sync `dist/` to S3
4. Invalidate CloudFront cache

Manual deploy:
```bash
npm run build
aws s3 sync dist/ s3://bukolajimoh-portfolio --delete
aws cloudfront create-invalidation --distribution-id E38VUDFFLZCXIJ --paths "/*"
```

---

Built by [Bukola Jimoh](https://d1zqsd6vsaz3bz.cloudfront.net) · [GitHub](https://github.com/obooks29) · [LinkedIn](https://linkedin.com/in/bukolajimoh)
