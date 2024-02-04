# RDS connection
- had to deploy elb env with single instance flag. Load balancer security group not jiving with aws
- had to allow inbound rule for auto-generated eb security group on rds security group
    - EB SG -> https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#SecurityGroup:groupId=sg-0c686adfceaa5d6ca
    - RDS SG -> https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#SecurityGroup:groupId=sg-08f89e881b62c197d

# eb
    - eb deploy 
    - eb setenv key=value ...