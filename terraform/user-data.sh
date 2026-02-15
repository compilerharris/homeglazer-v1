#!/bin/bash
# User data script for EC2 - Prepares environment for Home Glazer deployment
# Full app setup is done manually via SSH (see AWS_SETUP_GUIDE.md)

set -e
exec > >(tee /var/log/user-data.log) 2>&1

echo "Starting user-data script..."

# Update system
yum update -y

# Install Node.js 20 (LTS)
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs

# Install PM2 globally
npm install -g pm2

# Install Git
yum install -y git

# Verify installations
node --version
npm --version
pm2 --version
git --version

echo "User-data script completed. Ready for manual deployment."
