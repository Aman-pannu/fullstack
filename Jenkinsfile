pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                echo '"Fetch the source code from ${env.DIRECTORY_PATH}' 
            }
        }
        stage('Test') { 
            steps {
                echo 'Unit tests" and "Integration tests'  
            }
        }
        stage('Code Quality Check') { 
            steps {
                echo 'Check the quality of the code'  
            }
        }
        stage('Deploy') { 
            steps {
                echo 'Deploy the application to a testing environment ${env.TESTING_ENVIRONMENT}'  
            }
        }
        stage('Approval') { 
            steps {
                echo 'Deploy the application to a testing environment ${env.TESTING_ENVIRONMENT}' 
                input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                echo 'Deployed to testing environment ${TESTING_ENVIRONMENT}
            }
        }
        stage('Deploy to Production') { 
            steps {
                echo 'Deploy the application to a testing environment ${env.TESTING_ENVIRONMENT}'  
            }
        }
    }
}
