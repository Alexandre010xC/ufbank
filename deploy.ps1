docker build -t nestjs-app:latest .

minikube start --memory=1800mb --cpus=2

minikube docker-env | Invoke-Expression

docker build -t nestjs-app:latest .

kubectl apply -f k8s-deployment.yaml

kubectl rollout status deployment/nestjs-app

minikube service nestjs-service --url