# AWS Setup Guide - Home Glazer

Step-by-step guide to deploy the Home Glazer Next.js application on AWS using Terraform.

## Prerequisites

1. **Terraform** (v1.0+)
   ```bash
   brew install terraform   # macOS
   terraform version        # verify
   ```

2. **AWS CLI** and credentials
   ```bash
   brew install awscli
   aws configure   # Enter Access Key ID, Secret, region (e.g., us-east-1)
   ```

3. **EC2 Key Pair** - Create in AWS Console:
   - EC2 → Key Pairs → Create key pair
   - Name it (e.g., `homeglazer-key`) and download the `.pem` file
   - Keep the key pair name for `terraform.tfvars`

## Phase 1: Terraform Plan & Apply

### Step 1: Configure Variables

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` and set:
- `key_pair_name` - Your EC2 key pair name
- `db_password` - Strong password for RDS (min 8 chars)
  ```bash
  openssl rand -base64 24   # Generate a secure password
  ```

### Step 2: Initialize Terraform

```bash
terraform init
```

### Step 3: Validate Configuration

```bash
terraform validate
```

### Step 4: Preview Changes

```bash
terraform plan
```

Review the output. Terraform will create: VPC, subnets, EC2, RDS PostgreSQL, ALB, S3 bucket, security groups, IAM roles.

### Step 5: Apply Infrastructure

```bash
terraform apply
```

Type `yes` when prompted. Provisioning takes 5-10 minutes.

### Step 6: Get Outputs

```bash
terraform output
```

Note down:
- `ec2_public_ip` - For SSH
- `alb_url` - Your app URL (after deployment)
- `rds_endpoint` - For DATABASE_URL

For the sensitive `database_url`:
```bash
terraform output -raw database_url
```

## Phase 2: Deploy Application on EC2

### Step 1: SSH into EC2

```bash
ssh -i ~/.ssh/your-key.pem ec2-user@<ec2_public_ip>
```

Replace `your-key.pem` with your key file path and `<ec2_public_ip>` with the output value.

### Step 2: Clone Repository

```bash
git clone https://github.com/yourusername/homeglazer-v1.git
cd homeglazer-v1
```

Or use your repository URL.

### Step 3: Install Dependencies & Build

```bash
npm install
npm run build
```

### Step 4: Set Environment Variables

Create `.env` or `.env.production`:

```bash
# Database (use output from: terraform output -raw database_url)
DATABASE_URL="postgresql://homeglazer:YOUR_DB_PASSWORD@<rds-endpoint>:5432/homeglazer?schema=public"

# JWT Secret (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET="your-generated-jwt-secret"
```

### Step 5: Run Database Migrations

```bash
npx prisma migrate deploy
```

### Step 6: Seed Database (Optional)

```bash
npm run db:seed
```

### Step 7: Create Admin User (if not seeded)

```bash
npx tsx scripts/create-admin.ts
```

### Step 8: Start Application with PM2

```bash
pm2 start npm --name "homeglazer" -- start
pm2 save
pm2 startup   # Enable restart on reboot
```

### Step 9: Verify

Visit `http://<alb_dns_name>` from the Terraform output. The ALB may take 1-2 minutes to pass health checks.

## Phase 3: Optional Enhancements

### Custom Domain (Route 53 + ACM)

1. Create an ACM certificate in `us-east-1` for your domain
2. Add an HTTPS listener to the ALB in `terraform/alb.tf`
3. Create a Route 53 A record pointing to the ALB

### HTTPS (without custom domain)

Use ALB with a self-signed cert or consider AWS Certificate Manager with a domain.

### S3 Media Uploads

The Terraform creates an S3 bucket. To migrate the upload API:

1. Add `@aws-sdk/client-s3` to `package.json`
2. Modify `pages/api/upload.ts` to use S3 `PutObject` instead of filesystem
3. Set `S3_BUCKET`, `AWS_REGION` in environment variables
4. Serve media via CloudFront or S3 public URL

---

## Terraform Commands Reference

| Command | Purpose |
|---------|---------|
| `terraform init` | Initialize providers | 
| `terraform plan` | Preview changes |
| `terraform apply` | Create/update infrastructure |
| `terraform output` | Show outputs |
| `terraform destroy` | Tear down all resources |

---

## Troubleshooting

### EC2 connection refused

- Wait 2-3 minutes after apply for user-data to complete
- Check security group allows SSH (port 22) from your IP
- Verify key pair name matches

### Database connection failed

- Ensure `DATABASE_URL` uses the RDS endpoint (not the public IP)
- RDS is in private subnets; EC2 can reach it via VPC
- Check RDS security group allows EC2 security group on port 5432

### ALB returns 502

- Health check targets port 3000; ensure Next.js is running on 3000
- Run `pm2 status` and `pm2 logs homeglazer` on EC2
- ALB health check may take 2-3 minutes after app starts

### Build fails on EC2

- Ensure Node.js 20+ is installed (`node -v`)
- Check `npm run build` completes locally first
- Increase EC2 instance size if memory is insufficient (t3.small or t3.medium)
