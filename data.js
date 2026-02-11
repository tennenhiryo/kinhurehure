// ==========================================
//  【データ入力エリア】
//  Google Keepの「番号 英文」のリストを
//  バッククォート(`)の間に貼り付けてください。
// ==========================================
// data.js
// 必ず window.rawData = `...`; という形にしてください
window.rawData = `
001 Let’s try anyway.
002 Following the speech, we had dinner.
003 Please refer to the map.
004 Tickets are available online.
005 the sales department
006 a large conference room
007 according to the e-mail
008 Who most likely is the woman?
009 What does the man offer to do?
010 new office equipment
011 Please provide me with your e-mail address.
012 local businesses
013 purchase tickets
014 a job opening
015 construction project
016 while touring the factory
017 market research
018 attend a meeting
019 change a delivery date
020 I recently bought a printer.
021 What is indicated about Mr. Kato ?
022 an employee of a hotel
023 request additional staff
024 a customer survey
025 review a report
026 the production area
027 conveniently located near a subway station
028 details of a plan
029 announce the winners
030 a computer repair shop
031 an increase in sales
032 What is NOT included in the form ?
033 The item is currently out of stock.
034 an advertising campaign
035 We charge $50 for the service.
036 Mr. Kato is expected to arrive tomorrow.
037 a family-owned firm
038 visit a client
039 financial support from the government
040 an annual report
041 make an online payment
042 this year’s budget
043 fill out an application
044 before signing a contract
045 a management seminar
046 an employee’s performance
047 We are pleased with the final result.
048 confirm a payment
049 awards ceremony
050 a clothing store
051 products on display
052 a successful candidate
053 What is stated about the hotel ?
054 a museum exhibit
055 a Q&A session
056 Please note that prices may change.
057 process an order
058 Please read all the instructions.
059 sign up for membership
060 a travel agency
061 a Seattle-based company
062 a research facility
063 advance notice
064 join a committee
065 The event was successful.
066 excellent service
067 the fashion industry
068 pay a late fee
069 accept an offer
070 prepare for an upcoming event
071 Haruki Murakami’s latest novel
072 submit a report
073 use public transportation
074 send a resume
075 a company executive
076 introduce a new line of products
077 have no previous experience
078 review a proposal
079 office supplies
080 My resume is enclosed.
081 returns policy
082 register for employee training
083 arrange a meeting
084 receive a bill
085 hire an assistant
086 approve a plan
087 conduct a survey
088 an opportunity to work with you
089 the deadline for the project
090 a corporate trainer
091 a three-year warranty
092 necessary forms
093 reserve a room at a hotel
094 local residents
095 create a new logo
096 We are happy to inform you that
097 allow customers to pay online
098 What problem does the man mention ?
099 I really appreciate your help.
100 replacement parts
101 traffic updates
102 open a new branch
103 paid leave
104 Unfortunately, there are some problems.
105 in original condition
106 a rent increase
107 write a memo
108 shop for luggage
109 a newspaper editor
110 an art exhibition
111 a leading company
112 lead an organization
113 release a new album
114 for a limited time
115 a normal procedure
116 an experienced engineer
117 all company personnel
118 the author of a popular book
119 employee benefits
120 focus on one point
121 participate in the workshop
122 the cause of the problem
123 a degree in journalism
124 purchase directly from a Web site
125 the host of a television show
126 an expert in the field
127 We were impressed by your knowledge.
128 work mainly in the steel industry
129 make suggestions
130 relationships with suppliers
131 an important document
132 remind employees about the policy
133 Workers are required to wear uniforms.
134 a sales representative
135 the packaging area
136 a job description
137 a property manager
138 Call me at extension 4649.
139 inquire about a job
140 display merchandise
141 a highly successful business
142 The campaign resulted in success.
143 Thank you for your assistance.
144 Employees are encouraged to attend the event.
145 each individual in the company
146 when entering the laboratory
147 consider working in Japan
148 move the headquarters to Boston
149 We are ready to ship your order.
150 commercial buildings
151 a medical device
152 For whom is the notice intended ?
153 a product brochure
154 by express mail
155 I prefer to work part-time.
156 I’m writing in response to your letter.
157 companies in the region
158 donations to a museum
159 the third quarter
160 a rental agreement
161 a scientific journal
162 distribute a document
163 potential customers
164 reschedule an appointment
165 renew a contract
166 ship from a warehouse
167 a full refund
168 What are listeners advised to do ?
169 The tickets sold out immediately.
170 the city council
171 The program is usually broadcast on Saturdays.
172 I am responsible for training employees.
173 avoid wasting time
174 effective advertising campaigns
175 receive an invitation
176 reduce prices
177 park a vehicle
178 efficient use of energy
179 a car manufacturer
180 comfortable rooms and friendly staff
181 the correct address
182 downtown restaurants
183 the method of payment
184 the entire staff
185 a wide range of services
186 a hotel in a beautiful setting
187 We apologize for the inconvenience.
188 frequent use of the Internet
189 Tex’s promotion to sales manager
190 regarding your order
191 temporary workers
192 traditional Italian dishes
193 Admission is free for all members.
194 The room can fit 50 people.
195 contact a reference
196 shipment status
197 fuel costs
198 nearly two years
199 meet in the cafeteria for lunch
200 determine how to sell the product
201 travel expenses
202 overseas markets
203 I am fully satisfied with the service.
204 Where would the article most likely appear ?
205 develop a plan
206 improve a plan
207 a reasonable price
208 What is the man unable to do ?
209 All flights have been delayed.
210 legal advice
211 under the regulations
212 Our business is expanding.
213 the launch of a new product
214 a letter of recommendation
215 Please direct any questions to me.
216 increase profits
217 seek interns for the summer
218 the winning entry
219 file a claim
220 a repair crew
221 meet demand
222 sales figures
223 raise money for charity
224 I have attached my resume.
225 a way of attracting customers
226 provide health insurance for employees
227 the scheduled departure date
228 the mayor of Tex Town
229 an account balance
230 an estimate for the project
231 a commercial district
232 a former employee
233 design a modern building
234 tips on packing
235 establish a business
236 an option to change the date
237 retire after 20 years of service
238 the search for the next president
239 a specific example
240 agricultural technology
241 historical figures
242 I hope you find this information helpful.
243 complaints about the noise
244 experience in a related field
245 Simply fill out the form below.
246 offer a unique opportunity
247 any questions concerning the order
248 a well-deserved reputation
249 ability to speak three languages
250 the time of arrival
251 I am familiar with the area.
252 an ideal location
253 maintain a Web site
254 a landscaping company
255 organize an event
256 a significant increase in profits
257 a special occasion
258 safety standards
259 an impressive educational background
260 a guided tour
261 advanced technology
262 an alternative date
263 I’m confident that I can do it.
264 over the past two decades
265 attend the initial training session
266 My order arrived in two separate shipments.
267 the grand opening celebration
268 express concern
269 work environment
270 operate a machine safely
271 various designs and patterns
272 a brief report
273 full-time employees
274 the overall budget
275 achieve a sales target
276 pay on a monthly basis
277 a sports complex
278 We are delighted to see you.
279 obtain information from the Internet
280 honor an employee
281 properly trained staff
282 suitable for outdoor use
283 personal electronic devices
284 finalize a contract
285 a generous donation to a charity
286 in preparation for an event
287 main duties of a teacher
288 earn the respect of people
289 I am willing to work overseas.
290 The book is worth reading.
291 a project funded by the government
292 free overnight delivery
293 particularly interested in history
294 every aspect of a project
295 Please do not hesitate to contact us.
296 I was not involved with the project.
297 a regularly updated list
298 apply for a scholarship
299 The meeting will begin shortly.
300 automobile manufacturing
301 a security deposit
302 The book contains useful information.
303 the contents of the book
304 proof of purchase
305 affect the price
306 Our products are recognized for their quality.
307 represent a company
308 Tex was transferred to Alaska.
309 celebrate the twentieth anniversary
310 The machine will automatically shut down.
311 production capacity
312 travel destinations
313 obtain a grant
314 publish a magazine
315 The book is accompanied by a CD.
316 economic growth
317 check extremely carefully
318 a financial institution
319 accurate sales figures
320 compete with large companies
321 emphasize a point
322 I was aware of the problem.
323 The town is crowded with tourists.
324 The team was praised by the CEO.
325 a valuable addition to the team
326 explore the possibility
327 found a company
328 basic functions
329 have a negative impact on the environment
330 an amazing success
331 assure Tex that he will be promoted
332 Thank you for your cooperation.
333 a rise in popularity
334 a construction permit
335 solve a problem
336 vote against a proposal
337 locally grown crops
338 There are no hotels in this neighborhood.
339 the permanent exhibit
340 We regret to inform you that
341 slightly increased from 24 to 27 percent
342 The system is very complicated.
343 various factors
344 favorable customer reviews
345 guarantee same-day delivery
346 due to mechanical trouble
347 a high priority
348 relatively recent trend
349 Water is an important natural resource.
350 free shuttle service
351 The catalog is divided into three sections.
352 a singer native to the town
353 We can’t afford to do that.
354 high income
355 damage occurred during shipment
356 significant savings
357 research findings
358 I was unable to locate the book.
359 postpone a meeting
360 preserve the environment
361 prove to be difficult
362 I can’t remember the exact date.
363 gain popularity
364 labor costs
365 be widely regarded as
366 work closely with local businesses
367 deserve a promotion
368 identify problems
369 loyal customers
370 the most promising applicant
371 stress the importance of reading
372 analyze customer feedback
373 The report was commissioned by Tex Corporation.
374 We are committed to providing quality service.
375 a cost comparison
376 electronic components
377 enable staff to work from home
378 an enjoyable stay at a hotel
379 existing customers
380 post a flyer
381 proceed to the boarding gate
382 Tex prevented us from entering the room.
383 teachers and students alike
384 I was appointed chairperson of the committee.
385 a high-speed Internet connection
386 I am eager to learn new things.
387 ease of use
388 fairly common
389 absolutely free of charge
390 a warm atmosphere
391 calculate delivery costs
392 in contrast to last year
393 monitor the quality of products
394 I occasionally travel abroad.
395 practical experience
396 a serious problem
397 the strength of materials
398 equally important
399 imports from China
400 an informal survey
401 I haven't seen Tex lately.
402 Why did you choose this profession.
403 permission from a supervisor
404 ensure that the products are safe
405 hundreds of submissions from readers
406 notify employees of the change
407 I definitely need the item.
408 Employees are eligible to receive paid holidays.
409 All the paperwork is ready.
410 a complimentary breakfast
411 revise a plan
412 track an order
413 an administrative assistant
414 retail stores
415 reduce inventory
416 extensive analysis
417 promotional materials
418 catering service
419 a wildlife photographer
420 I have been assigned the work.
421 What is implied about the hotel?
422 I am looking forward to the banquet.
423 valid until the end of May
424 provide quality service at affordable prices
425 a newly renovated library
426 follow industry guidelines
427 a copy of the certificate
428 an innovative technology
429 the first item on the agenda
430 assembly line workers
431 install a new printer
432 new employee orientation
433 a renowned scientist
434 appropriate clothes for a job interview
435 use fresh ingredients
436 a storage facility
437 serve food and beverages to guests
438 prior to the meeting
439 the upcoming merger with Tex Corporation
440 a seaside inn
441 Each room is equipped with Internet access.
442 a brief summary
443 a two-year lease
444 return a defective product
445 a quarterly magazine
446 an extended warranty
447 a famous architect
448 a local grocery store
449 a sculpture exhibition
450 send an itinerary
451 the company directory
452 My driver's license expires in April.
453 negotiate with vendors
454 talk with a colleague
455 library patrons
456 relocate an office
457 tourism industry
458 My office is being remodeled.
459 consumer reports
460 inspect a building
461 I have eaten at numerous local restaurants.
462 a new payroll system
463 I am qualified for the position.
464 kitchen appliances
465 excellent service and competitive prices
466 The company specializes in Web design.
467 fill out a questionnaire
468 approximately two hours
469 contribute to a team
470 improve productivity
471 The meeting starts promptly at 1 P.M.
472 a marketing strategy
473 experienced and dedicated staff
474 exceptional customer service
475 hold a luncheon
476 exceed expectations
477 operate in multiple countries
478 the regulations clearly specify that
479 a convention venue
480 household products
481 evaluate a product
482 negotiate with a client
483 make a booking
484 a daily circulation of 30,000
485 the completion of the project
486 relevant work experience
487 a thorough review
488 fly to Seattle via Denver
489 relationships in the workplace
490 The price includes flights and accommodations.
491 flexible work hours
492 some experts predict that
493 seat and meal preferences
494 reduce costs by substantial amount
495 easily accessible by train
496 media coverage
497 generate profits
498 Refreshments will be served.
499 a reliable secretary
500 advertising revenue
501 the fund-raising dinner
502 an accomplished designer
503 acquire a company
504 The weather is cold, so dress accordingly.
505 positive reviews from critics
506 highlight differences
507 profile a businessperson
508 motivate employees
509 a magazine subscription
510 encounter a serious problem
511 a luxury sedan
512 Street parking is prohibited in this area.
513 The problem was resolved.
514 Telephone service was restored this morning.
515 surrounding areas
516 alert Tex to the problem
517 the highly anticipated new book
518 consistently rank among the top 10 universities
519 fat-free dairy products
520 the first phase
521 edit a manuscript
522 work a lot of overtime
523 on the premises
524 The rent includes all utility
525 a laundry room
526 I am enthusiastic about the project.
527 outline a policy
528 a packet of materials
529 retain a receipt
530 Make sure you have all your belongings
531 energy conservation
532 routine maintenance work
533 live in urban areas
534 50 percent of the workforce
535 a brief biography of the author
536 The company has recently changed ownership.
537 a pastry chef
538 both building managers and tenant
539 reduce the workload
540 sufficient time
541 main characteristics of the product
542 a combined effort
543 The event will conclude with a concert.
544 costs associated with buying a house
545 because of a scheduling conflict
546 real estate investment
547 see a physician
548 as a token of our appreciation for
549 a partial refund
550 resume operations
551 car dealerships
552 The garment is made of cotton.
553 Security measures were implemented.
554 receive a paycheck
555 recruit new staff
556 substitute new for old
557 Our tours typically take an hour.
558 an authorized dealer
559 more expensive than somparable products
560 a faculty member at Tex College
561 a growth initiative
562 Postage is calculated by weight.
563 The author will sign books afterwards.
564 aim to cut energy use
565 The film received generally positive reviews.
566 The room is occupied.
567 a solid reputation
568 Tex's attempt to become a singer
569 the person in authority
570 the domestic market
571 without permission
572 a strong presence in the area
573 a rapidly growing company
574 provide relief to consumers
575 reward employees for their hard work
576 translate English into japanese
577 under any circumstances
578 contrary to expectations
579 Mr. Kato was eventually promoted to CEO.
580 be directly exposed to the sun
581 a panel of experts
582 the bottom portion of the ticket
583 primary duties
584 opening remarks
585 in a timely manner
586 the most commonly used methods
587 consult a doctor
588 convert a warehouse into an office
589 You have no obligation to do so.
590 resign without notice
591 The door is securely locked.
592 strive to cut costs
593 a timeline of events
594 urge Tex to change his mind
595 acknowledge receipt of the order
596 a diverse group of experts
597 a bank transaction
598 a lack of information
599 Customer satisfaction is essential to us.
600 the majority of employees
`;
