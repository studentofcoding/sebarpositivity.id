const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC'
}

function flattenIssue (issue) {
  return {
    id: issue.sys.id,
    issueNumber: issue.fields.issueNumber,
    publishedOn: issue.fields.publishedOn,
    title: issue.fields.title,
    description: issue.fields.description,
    authors: issue.fields.authors,
    stories: issue.fields.stories,
    podcast: flattenPodcast(issue.fields.podcast)
  }
}

function flattenPodcast (podcast) {
  return {
    id: podcast.fields.id,
    source: podcast.fields.source,
    title: podcast.fields.issue.fields.title,
    issueNumber: podcast.fields.issue.fields.issueNumber,
    publishedOn: podcast.fields.issue.fields.publishedOn
  }
}

function flattenTag (tag) {
  return {
    id: tag.sys.id,
    name: tag.fields.name
  }
}

function parseDate (publishedOn) {
  const date = new Date(publishedOn)
  return date.toLocaleString('en-US', dateOptions)
}

module.exports = {
  flattenIssue,
  flattenPodcast,
  flattenTag,
  parseDate
}
