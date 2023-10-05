FROM --platform=linux/amd64 python:3.8
WORKDIR /usr/src/app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
EXPOSE 5000
EXPOSE 6001
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=5000"]