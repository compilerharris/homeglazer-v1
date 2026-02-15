# IAM roles for EC2 (S3 access for media uploads)

resource "aws_iam_role" "ec2" {
  name = "${var.project_name}-${var.environment}-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "${var.project_name}-${var.environment}-ec2-role"
  }
}

resource "aws_iam_instance_profile" "ec2" {
  name = "${var.project_name}-${var.environment}-ec2-profile"
  role = aws_iam_role.ec2.name
}

# S3 access for media uploads (when migrated to S3)
resource "aws_iam_role_policy" "ec2_s3" {
  count = var.enable_s3_uploads ? 1 : 0

  name = "${var.project_name}-${var.environment}-s3-policy"
  role = aws_iam_role.ec2.id

  # Only reference S3 bucket when it exists (enable_s3_uploads=true)
  policy = var.enable_s3_uploads ? jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.media[0].arn,
          "${aws_s3_bucket.media[0].arn}/*"
        ]
      }
    ]
  }) : jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:ListAllMyBuckets"]
      Resource = ["*"]
    }]
  })
}
