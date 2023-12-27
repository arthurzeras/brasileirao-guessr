FROM public.ecr.aws/lambda/python:3.10

RUN pip install poetry
RUN poetry config virtualenvs.create false

COPY pyproject.toml poetry.lock ${LAMBDA_TASK_ROOT}
RUN poetry install --no-root

COPY spreadsheet.py auth_google.py function.py ${LAMBDA_TASK_ROOT}

CMD [ "function.handler" ]