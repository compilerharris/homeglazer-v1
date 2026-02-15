# S3 bucket for media uploads (brands, products, blogs, documents)

resource "aws_s3_bucket" "media" {
  count = var.enable_s3_uploads ? 1 : 0

  bucket = "${var.project_name}-${var.environment}-media-${data.aws_caller_identity.current.account_id}"

  tags = {
    Name = "${var.project_name}-${var.environment}-media"
  }
}

resource "aws_s3_bucket_public_access_block" "media" {
  count = var.enable_s3_uploads ? 1 : 0

  bucket = aws_s3_bucket.media[0].id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "media" {
  count = var.enable_s3_uploads ? 1 : 0

  bucket = aws_s3_bucket.media[0].id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_cors_configuration" "media" {
  count = var.enable_s3_uploads ? 1 : 0

  bucket = aws_s3_bucket.media[0].id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
  }
}

data "aws_caller_identity" "current" {}
