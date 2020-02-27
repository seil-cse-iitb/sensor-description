docker kill kresit-tree
docker rm kresit-tree
docker build -t sapantanted/kresit-tree-web-app-node . 
docker run --name kresit-tree -p 8081:8080 -d sapantanted/kresit-tree-web-app-node 